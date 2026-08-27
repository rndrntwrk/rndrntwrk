#!/usr/bin/env python3
"""Read-only reconstruction of catalyst's Pump.fun bonding-curve trades."""
from __future__ import annotations

import csv
import json
import math
import os
import time
import traceback
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable

from curl_cffi import requests
from solders.pubkey import Pubkey

MINT = "5mH155ePpNWJb2GktpftLJbcTvoxFaUrv7XkZPDtpump"
POOL = "58osDYARtvC5xy6GakQaBm16kDA4XwFyH4UfvtrjMvxj"
CREATOR = "5SwBKASggA52FRNRZS6esVNRDNCgG18dAFcXbuAPhH7u"
PUMP_PROGRAM = "6EF8rrecthR5DkZon8Nwu78hRvfCKubJ14M5uBEwF6P"
CREATED_TS = 1783652242
MIGRATION_TS = 1787265471
OUT = Path("forensics/catalyst/output")
OUT.mkdir(parents=True, exist_ok=True)
MAX_SIGNATURES = int(os.getenv("MAX_SIGNATURES", "30000"))
MAX_TX = int(os.getenv("MAX_TX", "30000"))
MAX_CURRENT_BALANCES = int(os.getenv("MAX_CURRENT_BALANCES", "100"))
MAX_FUNDERS = int(os.getenv("MAX_FUNDERS", "35"))
MAX_GMGN = int(os.getenv("MAX_GMGN", "60"))

SESSION = requests.Session(impersonate="chrome")
HEADERS = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "referer": "https://gmgn.ai/?chain=sol",
    "origin": "https://gmgn.ai",
}
RPC_URLS = [
    "https://solana-rpc.publicnode.com",
    "https://api.mainnet-beta.solana.com",
    "https://solana.api.onfinality.io/public",
    "https://rpc.ankr.com/solana",
    "https://solana.drpc.org",
]
LOG: list[str] = []
STATUS: dict[str, Any] = {}


def iso(ts: Any) -> str | None:
    if ts is None:
        return None
    return datetime.fromtimestamp(float(ts), timezone.utc).isoformat()


def f(value: Any, default: float = 0.0) -> float:
    try:
        x = float(value)
        return x if math.isfinite(x) else default
    except (TypeError, ValueError):
        return default


def log(message: str) -> None:
    line = f"[{datetime.now(timezone.utc).isoformat()}] {message}"
    LOG.append(line)
    print(line, flush=True)


def write_json(name: str, value: Any) -> None:
    (OUT / name).write_text(json.dumps(value, indent=2, default=str), encoding="utf-8")


def write_csv(name: str, rows: list[dict[str, Any]]) -> None:
    path = OUT / name
    if not rows:
        path.write_text("", encoding="utf-8")
        return
    keys: list[str] = []
    seen: set[str] = set()
    for row in rows:
        for key in row:
            if key not in seen:
                seen.add(key)
                keys.append(key)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=keys, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def get_json(label: str, url: str) -> Any:
    try:
        response = SESSION.get(url, headers=HEADERS, timeout=45)
        STATUS[label] = {"url": url, "status": response.status_code, "bytes": len(response.content)}
        log(f"{label}: HTTP {response.status_code}, {len(response.content):,} bytes")
        if response.status_code == 200:
            return response.json()
        STATUS[label]["preview"] = response.text[:500]
    except Exception as exc:
        STATUS[label] = {"url": url, "error": repr(exc)}
        log(f"{label} failed: {exc!r}")
    return None


class RPC:
    def __init__(self) -> None:
        self.request_id = 1
        self.cursor = 0
        self.stats: dict[str, dict[str, int]] = {
            url: {"ok": 0, "fail": 0} for url in RPC_URLS
        }

    def ordered(self) -> list[str]:
        urls = RPC_URLS[self.cursor :] + RPC_URLS[: self.cursor]
        self.cursor = (self.cursor + 1) % len(RPC_URLS)
        return sorted(urls, key=lambda url: self.stats[url]["fail"] - self.stats[url]["ok"] * 0.03)

    def call(self, method: str, params: list[Any], attempts: int = 8) -> Any:
        last: Exception | None = None
        for attempt in range(attempts):
            for url in self.ordered():
                payload = {"jsonrpc": "2.0", "id": self.request_id, "method": method, "params": params}
                self.request_id += 1
                try:
                    response = SESSION.post(url, json=payload, timeout=60)
                    if response.status_code != 200:
                        raise RuntimeError(f"HTTP {response.status_code}: {response.text[:180]}")
                    body = response.json()
                    if body.get("error"):
                        raise RuntimeError(str(body["error"]))
                    self.stats[url]["ok"] += 1
                    return body.get("result")
                except Exception as exc:
                    self.stats[url]["fail"] += 1
                    last = exc
            time.sleep(min(0.75 * (attempt + 1), 5))
        raise RuntimeError(f"RPC {method} exhausted: {last!r}")

    def txs(self, signatures: list[str], batch_size: int = 30) -> list[Any]:
        output: list[Any] = []
        for offset in range(0, len(signatures), batch_size):
            chunk = signatures[offset : offset + batch_size]
            done = False
            for url in self.ordered():
                ids: list[int] = []
                payload: list[dict[str, Any]] = []
                for signature in chunk:
                    rid = self.request_id
                    self.request_id += 1
                    ids.append(rid)
                    payload.append({
                        "jsonrpc": "2.0",
                        "id": rid,
                        "method": "getTransaction",
                        "params": [signature, {
                            "encoding": "jsonParsed",
                            "commitment": "confirmed",
                            "maxSupportedTransactionVersion": 0,
                        }],
                    })
                try:
                    response = SESSION.post(url, json=payload, timeout=120)
                    if response.status_code != 200:
                        raise RuntimeError(f"HTTP {response.status_code}")
                    body = response.json()
                    if not isinstance(body, list):
                        raise RuntimeError("non-batch response")
                    by_id = {int(item.get("id")): item.get("result") for item in body if not item.get("error")}
                    output.extend(by_id.get(rid) for rid in ids)
                    self.stats[url]["ok"] += 1
                    done = True
                    break
                except Exception:
                    self.stats[url]["fail"] += 1
            if not done:
                for signature in chunk:
                    try:
                        output.append(self.call("getTransaction", [signature, {
                            "encoding": "jsonParsed",
                            "commitment": "confirmed",
                            "maxSupportedTransactionVersion": 0,
                        }], attempts=4))
                    except Exception:
                        output.append(None)
            if offset % 300 == 0:
                log(f"transactions: {min(offset + len(chunk), len(signatures)):,}/{len(signatures):,}")
            time.sleep(0.08)
        return output


RPC_CLIENT = RPC()
CURVE = str(Pubkey.find_program_address(
    [b"bonding-curve", bytes(Pubkey.from_string(MINT))],
    Pubkey.from_string(PUMP_PROGRAM),
)[0])


def signatures_for(address: str, max_records: int, stop_ts: int | None = None) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    before: str | None = None
    while len(rows) < max_records:
        options: dict[str, Any] = {"limit": min(1000, max_records - len(rows)), "commitment": "confirmed"}
        if before:
            options["before"] = before
        page = RPC_CLIENT.call("getSignaturesForAddress", [address, options]) or []
        rows.extend(page)
        oldest = min((int(item["blockTime"]) for item in page if item.get("blockTime")), default=None)
        log(f"signatures {address[:7]}: {len(rows):,}; oldest={iso(oldest)}")
        if len(page) < options["limit"] or (stop_ts and oldest and oldest <= stop_ts):
            break
        before = page[-1].get("signature") if page else None
        if not before:
            break
        time.sleep(0.15)
    dedup = {row["signature"]: row for row in rows if row.get("signature")}
    return sorted(dedup.values(), key=lambda row: (row.get("blockTime") or 0, row.get("slot") or 0))


def keys_and_signers(tx: dict[str, Any]) -> tuple[list[str], list[str]]:
    raw = tx.get("transaction", {}).get("message", {}).get("accountKeys", [])
    keys: list[str] = []
    signers: list[str] = []
    for index, item in enumerate(raw):
        if isinstance(item, dict):
            key = str(item.get("pubkey", ""))
            signer = bool(item.get("signer"))
        else:
            key = str(item)
            signer = index == 0
        keys.append(key)
        if signer and key:
            signers.append(key)
    return keys, signers


def token_owner_deltas(tx: dict[str, Any]) -> dict[str, float]:
    meta = tx.get("meta") or {}
    state: dict[tuple[int, str], dict[str, int]] = {}
    for side, items in (("pre", meta.get("preTokenBalances") or []), ("post", meta.get("postTokenBalances") or [])):
        for item in items:
            if item.get("mint") != MINT or not item.get("owner"):
                continue
            amount = item.get("uiTokenAmount") or {}
            key = (int(item.get("accountIndex", -1)), str(item["owner"]))
            entry = state.setdefault(key, {"pre": 0, "post": 0, "decimals": int(amount.get("decimals", 6))})
            entry[side] = int(amount.get("amount") or 0)
    out: dict[str, float] = defaultdict(float)
    for (_index, owner), entry in state.items():
        out[owner] += (entry["post"] - entry["pre"]) / (10 ** entry["decimals"])
    return dict(out)


def parse_trade(signature: str, tx: Any) -> dict[str, Any] | None:
    if not tx or not tx.get("meta") or tx["meta"].get("err") is not None:
        return None
    keys, signers = keys_and_signers(tx)
    deltas = token_owner_deltas(tx)
    wallet: str | None = None
    token_delta = 0.0
    for signer in signers:
        if abs(deltas.get(signer, 0.0)) > abs(token_delta):
            wallet, token_delta = signer, deltas[signer]
    if not wallet or abs(token_delta) < 1e-9:
        return None
    meta = tx["meta"]
    curve_sol_delta = 0.0
    wallet_sol_delta = 0.0
    for address, target in ((CURVE, "curve"), (wallet, "wallet")):
        try:
            index = keys.index(address)
            delta = (int(meta["postBalances"][index]) - int(meta["preBalances"][index])) / 1e9
        except Exception:
            delta = 0.0
        if target == "curve":
            curve_sol_delta = delta
        else:
            wallet_sol_delta = delta
    action = "buy" if token_delta > 0 else "sell"
    ts = int(tx.get("blockTime") or 0)
    return {
        "signature": signature,
        "slot": tx.get("slot"),
        "block_time": ts,
        "utc": iso(ts),
        "wallet": wallet,
        "action": action,
        "token_delta": token_delta,
        "token_amount": abs(token_delta),
        "curve_sol_delta": curve_sol_delta,
        "wallet_sol_delta": wallet_sol_delta,
        "buy_sol_est": max(0.0, curve_sol_delta) if action == "buy" else 0.0,
        "sell_sol_est": max(0.0, -curve_sol_delta) if action == "sell" else 0.0,
        "avg_price_sol": abs(curve_sol_delta / token_delta) if token_delta else None,
        "implied_mcap_sol": abs(curve_sol_delta / token_delta) * 1_000_000_000 if token_delta else None,
        "fee_sol": f(meta.get("fee")) / 1e9,
    }


def aggregate(trades: list[dict[str, Any]]) -> list[dict[str, Any]]:
    grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for trade in trades:
        grouped[trade["wallet"]].append(trade)
    windows = {"7d": 604800, "24h": 86400, "6h": 21600, "1h": 3600, "30m": 1800, "10m": 600}
    output: list[dict[str, Any]] = []
    for wallet, rows in grouped.items():
        rows.sort(key=lambda row: row["block_time"])
        buys = [row for row in rows if row["action"] == "buy"]
        sells = [row for row in rows if row["action"] == "sell"]
        first = rows[0]["block_time"]
        first_buy = buys[0] if buys else None
        record: dict[str, Any] = {
            "wallet": wallet,
            "first_trade_ts": first,
            "first_trade_utc": iso(first),
            "days_before_migration": round((MIGRATION_TS - first) / 86400, 5),
            "first_buy_signature": first_buy["signature"] if first_buy else None,
            "first_buy_ts": first_buy["block_time"] if first_buy else None,
            "last_buy_utc": iso(max((row["block_time"] for row in buys), default=0)) if buys else None,
            "buy_count": len(buys),
            "sell_count": len(sells),
            "buy_tokens": sum(row["token_amount"] for row in buys),
            "sell_tokens": sum(row["token_amount"] for row in sells),
            "net_tokens": sum(row["token_delta"] for row in rows),
            "buy_sol_est": sum(row["buy_sol_est"] for row in buys),
            "sell_sol_est": sum(row["sell_sol_est"] for row in sells),
        }
        for label, seconds in windows.items():
            cutoff = MIGRATION_TS - seconds
            scoped = [row for row in rows if row["block_time"] >= cutoff]
            record[f"buy_sol_{label}"] = sum(row["buy_sol_est"] for row in scoped if row["action"] == "buy")
            record[f"net_tokens_{label}"] = sum(row["token_delta"] for row in scoped)
            record[f"buy_count_{label}"] = sum(1 for row in scoped if row["action"] == "buy")
        if first <= CREATED_TS + 600:
            record["timing_class"] = "launch-window"
        elif first < MIGRATION_TS - 604800:
            record["timing_class"] = "old-holder"
        elif first < MIGRATION_TS - 86400:
            record["timing_class"] = "week-before"
        elif first < MIGRATION_TS - 21600:
            record["timing_class"] = "day-before"
        elif first < MIGRATION_TS - 3600:
            record["timing_class"] = "six-hours-before"
        elif first < MIGRATION_TS - 600:
            record["timing_class"] = "hour-before"
        else:
            record["timing_class"] = "final-ten-minutes"
        record["signal_score"] = (
            record["buy_sol_24h"] * 12
            + record["buy_sol_6h"] * 8
            + record["buy_sol_1h"] * 5
            + max(0.0, record["net_tokens_24h"]) / 1_000_000
        )
        output.append(record)
    return sorted(output, key=lambda row: (row["signal_score"], row["buy_sol_est"]), reverse=True)


def current_balance(wallet: str) -> float | None:
    try:
        result = RPC_CLIENT.call("getTokenAccountsByOwner", [
            wallet, {"mint": MINT}, {"encoding": "jsonParsed", "commitment": "confirmed"}
        ], attempts=4)
    except Exception:
        return None
    total = 0.0
    for item in (result or {}).get("value", []):
        try:
            amount = item["account"]["data"]["parsed"]["info"]["tokenAmount"]
            total += int(amount["amount"]) / (10 ** int(amount["decimals"]))
        except Exception:
            pass
    return total


def immediate_funder(wallet_row: dict[str, Any]) -> dict[str, Any] | None:
    signature = wallet_row.get("first_buy_signature")
    if not signature:
        return None
    try:
        sigs = RPC_CLIENT.call("getSignaturesForAddress", [wallet_row["wallet"], {
            "before": signature, "limit": 50, "commitment": "confirmed"
        }], attempts=4) or []
    except Exception:
        return None
    signatures = [row["signature"] for row in sigs if row.get("signature") and row.get("err") is None]
    txs = RPC_CLIENT.txs(signatures, batch_size=20)
    for sig, tx in zip(signatures, txs):
        if not tx or not tx.get("meta") or tx["meta"].get("err") is not None:
            continue
        keys, signers = keys_and_signers(tx)
        meta = tx["meta"]
        try:
            wi = keys.index(wallet_row["wallet"])
            received = (int(meta["postBalances"][wi]) - int(meta["preBalances"][wi])) / 1e9
        except Exception:
            continue
        if received <= 0.02:
            continue
        source = None
        source_delta = 0.0
        for signer in signers:
            if signer == wallet_row["wallet"]:
                continue
            try:
                si = keys.index(signer)
                delta = (int(meta["postBalances"][si]) - int(meta["preBalances"][si])) / 1e9
            except Exception:
                continue
            if delta < source_delta:
                source, source_delta = signer, delta
        if source:
            return {
                "wallet": wallet_row["wallet"],
                "funder": source,
                "received_sol": received,
                "funder_delta_sol": source_delta,
                "funding_signature": sig,
                "funding_ts": tx.get("blockTime"),
                "funding_utc": iso(tx.get("blockTime")),
                "first_buy_utc": iso(wallet_row.get("first_buy_ts")),
                "minutes_to_first_buy": round((f(wallet_row.get("first_buy_ts")) - f(tx.get("blockTime"))) / 60, 3),
            }
    return None


def minute_flow(trades: list[dict[str, Any]]) -> list[dict[str, Any]]:
    buckets: dict[int, list[dict[str, Any]]] = defaultdict(list)
    for trade in trades:
        minute = (trade["block_time"] // 60) * 60
        buckets[minute].append(trade)
    rows: list[dict[str, Any]] = []
    for minute, items in sorted(buckets.items()):
        buys = [x for x in items if x["action"] == "buy"]
        sells = [x for x in items if x["action"] == "sell"]
        rows.append({
            "minute_ts": minute,
            "utc": iso(minute),
            "buy_sol": sum(x["buy_sol_est"] for x in buys),
            "sell_sol": sum(x["sell_sol_est"] for x in sells),
            "net_curve_sol": sum(x["curve_sol_delta"] for x in items),
            "buys": len(buys),
            "sells": len(sells),
            "unique_buyers": len({x["wallet"] for x in buys}),
            "highest_implied_mcap_sol": max((f(x.get("implied_mcap_sol")) for x in items), default=0.0),
        })
    for index, row in enumerate(rows):
        scoped = rows[max(0, index - 9) : index + 1]
        row["rolling_10m_buy_sol"] = sum(f(x["buy_sol"]) for x in scoped)
        row["rolling_10m_net_sol"] = sum(f(x["net_curve_sol"]) for x in scoped)
    return rows


def normalize_gmgn(body: Any) -> dict[str, Any] | None:
    data = body.get("data") if isinstance(body, dict) else None
    if not isinstance(data, dict):
        return None
    return {
        "total_profit_pnl": data.get("total_profit_pnl"),
        "realized_profit_7d": data.get("realized_profit_7d"),
        "realized_profit_30d": data.get("realized_profit_30d"),
        "winrate": data.get("winrate"),
        "sol_balance": data.get("sol_balance"),
        "buy_7d": data.get("buy_7d"),
        "buy_30d": data.get("buy_30d"),
        "avg_holding_period_seconds": data.get("avg_holding_peroid"),
        "tags": data.get("tags"),
    }


def run() -> None:
    log(f"mint={MINT}; curve={CURVE}; migration={iso(MIGRATION_TS)}")
    supplemental = {
        "pump_coin": get_json("pump_coin", f"https://frontend-api-v3.pump.fun/coins/{MINT}"),
        "dex_pair": get_json("dex_pair", f"https://api.dexscreener.com/latest/dex/pairs/solana/{POOL}"),
        "gmgn_trades": get_json("gmgn_trades", f"https://gmgn.ai/vas/api/v1/token_trades/sol/{MINT}?revert=true&limit=1000"),
        "gmgn_holders": get_json("gmgn_holders", f"https://gmgn.ai/vas/api/v1/token_holders/sol/{MINT}?orderby=amount_percentage&direction=desc&limit=100"),
        "sol_history": get_json("sol_history", "https://api.coingecko.com/api/v3/coins/solana/market_chart/range?vs_currency=usd&from=1787179071&to=1787351871"),
    }
    write_json("supplemental_raw.json", supplemental)

    sig_rows = signatures_for(CURVE, MAX_SIGNATURES, CREATED_TS - 60)
    write_json("curve_signatures.json", sig_rows)
    eligible = [row for row in sig_rows if row.get("err") is None and row.get("blockTime") and int(row["blockTime"]) <= MIGRATION_TS + 120]
    if len(eligible) > MAX_TX:
        eligible = eligible[-MAX_TX:]
    txs = RPC_CLIENT.txs([row["signature"] for row in eligible], batch_size=30)
    trades: list[dict[str, Any]] = []
    for signature_row, tx in zip(eligible, txs):
        trade = parse_trade(signature_row["signature"], tx)
        if trade and trade["block_time"] <= MIGRATION_TS + 60:
            trades.append(trade)
    trades.sort(key=lambda row: (row["block_time"], row.get("slot") or 0))
    write_csv("prebond_trades.csv", trades)
    log(f"parsed trades={len(trades):,}")

    wallets = aggregate(trades)
    for index, row in enumerate(wallets[:MAX_CURRENT_BALANCES]):
        row["current_token_balance"] = current_balance(row["wallet"])
        net = f(row.get("net_tokens"))
        row["current_vs_curve_net_ratio"] = f(row.get("current_token_balance")) / net if net > 0 and row.get("current_token_balance") is not None else None
        if index and index % 20 == 0:
            log(f"current balances={index}/{min(len(wallets), MAX_CURRENT_BALANCES)}")
    write_csv("prebond_wallets.csv", wallets)

    funders: list[dict[str, Any]] = []
    funder_candidates = [row for row in wallets if f(row.get("buy_sol_24h")) >= 0.1][:MAX_FUNDERS]
    for index, row in enumerate(funder_candidates):
        found = immediate_funder(row)
        if found:
            funders.append(found)
        if index and index % 10 == 0:
            log(f"funders={index}/{len(funder_candidates)}")
    counts: dict[str, int] = defaultdict(int)
    for row in funders:
        counts[row["funder"]] += 1
    for row in funders:
        row["candidate_wallets_from_same_funder"] = counts[row["funder"]]
    write_csv("funders.csv", funders)

    flow = minute_flow(trades)
    write_csv("minute_curve_flow.csv", flow)
    burst_minutes = sorted(flow, key=lambda row: (f(row["rolling_10m_net_sol"]), f(row["rolling_10m_buy_sol"])), reverse=True)[:30]
    write_csv("largest_curve_acceleration_minutes.csv", burst_minutes)

    gmgn_rows: list[dict[str, Any]] = []
    for index, row in enumerate(wallets[:MAX_GMGN], start=1):
        body = get_json(f"gmgn_wallet_{index}", f"https://gmgn.ai/defi/quotation/v1/smartmoney/sol/walletNew/{row['wallet']}?period=7d")
        normalized = normalize_gmgn(body)
        if normalized:
            gmgn_rows.append({"wallet": row["wallet"], "signal_score": row["signal_score"], **normalized})
        time.sleep(0.12)
    write_csv("gmgn_wallet_stats.csv", gmgn_rows)

    shared_funders = [
        {"funder": address, "candidate_wallet_count": count}
        for address, count in sorted(counts.items(), key=lambda item: item[1], reverse=True)
        if count >= 2
    ]
    late = [row for row in wallets if row["timing_class"] not in {"launch-window", "old-holder"} and f(row.get("net_tokens_24h")) > 0]
    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "mint": MINT,
        "pool": POOL,
        "creator": CREATOR,
        "curve": CURVE,
        "created_utc": iso(CREATED_TS),
        "migration_utc": iso(MIGRATION_TS),
        "signature_count": len(sig_rows),
        "parsed_trade_count": len(trades),
        "unique_curve_wallets": len(wallets),
        "late_accumulator_count": len(late),
        "shared_funders": shared_funders,
        "top_late_accumulators": late[:40],
        "top_curve_wallets": wallets[:40],
        "largest_curve_acceleration_minutes": burst_minutes,
        "rpc_stats": RPC_CLIENT.stats,
        "methodology": [
            "Trades are derived from confirmed pre/post token balances in transactions touching the Pump.fun bonding-curve PDA.",
            "SOL size uses the curve PDA's lamport delta, reducing wallet-rent and fee distortion.",
            "Launch-window and old-holder inventory are explicitly separated from late accumulation.",
            "Shared funders are clustering leads, not proof of common ownership.",
        ],
    }
    write_json("summary.json", summary)
    STATUS["rpc"] = RPC_CLIENT.stats
    write_json("endpoint_status.json", STATUS)
    (OUT / "run.log").write_text("\n".join(LOG) + "\n", encoding="utf-8")
    log("complete")


if __name__ == "__main__":
    try:
        run()
    except Exception as exc:
        log(f"FATAL {exc!r}")
        (OUT / "traceback.txt").write_text(traceback.format_exc(), encoding="utf-8")
        STATUS["rpc"] = RPC_CLIENT.stats
        write_json("endpoint_status.json", STATUS)
        (OUT / "run.log").write_text("\n".join(LOG) + "\n", encoding="utf-8")
        raise
