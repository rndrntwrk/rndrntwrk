#!/usr/bin/env python3
"""Paginate GMGN's indexed catalyst ledger and reconstruct the pre-bond signal wallets.

This is read-only. It deliberately separates launch bundles, month-old holders,
late bonding-curve accumulation, and post-migration momentum flow.
"""
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
from typing import Any
from urllib.parse import urlencode

from curl_cffi import requests

MINT = "5mH155ePpNWJb2GktpftLJbcTvoxFaUrv7XkZPDtpump"
POOL = "58osDYARtvC5xy6GakQaBm16kDA4XwFyH4UfvtrjMvxj"
CREATOR = "5SwBKASggA52FRNRZS6esVNRDNCgG18dAFcXbuAPhH7u"
CREATED_TS = 1783652240
MIGRATION_TS = 1787265471
SUPPLY = 1_000_000_000.0
OUT = Path("forensics/catalyst/output")
OUT.mkdir(parents=True, exist_ok=True)
MAX_PAGES = int(os.getenv("GMGN_MAX_PAGES", "500"))
PAGE_LIMIT = int(os.getenv("GMGN_PAGE_LIMIT", "50"))
STOP_AFTER_SECONDS = int(os.getenv("STOP_AFTER_SECONDS", "300"))
MAX_WALLET_STATS = int(os.getenv("MAX_WALLET_STATS", "80"))

SESSION = requests.Session(impersonate="chrome")
HEADERS = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "referer": "https://gmgn.ai/?chain=sol",
    "origin": "https://gmgn.ai",
    "user-agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    ),
}
LOG: list[str] = []
HTTP_STATUS: dict[str, Any] = {}


def iso(ts: Any) -> str | None:
    if ts in (None, "", 0, "0"):
        return None
    return datetime.fromtimestamp(float(ts), timezone.utc).isoformat()


def num(value: Any, default: float = 0.0) -> float:
    try:
        parsed = float(value)
        return parsed if math.isfinite(parsed) else default
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
    fields: list[str] = []
    seen: set[str] = set()
    for row in rows:
        for key in row:
            if key not in seen:
                seen.add(key)
                fields.append(key)
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def get_json(label: str, url: str, params: dict[str, Any] | None = None, retries: int = 7) -> Any:
    last_error: Exception | None = None
    for attempt in range(retries):
        try:
            response = SESSION.get(url, params=params, headers=HEADERS, timeout=50)
            HTTP_STATUS[label] = {
                "url": f"{url}?{urlencode(params or {})}" if params else url,
                "status": response.status_code,
                "bytes": len(response.content),
                "attempt": attempt + 1,
            }
            if response.status_code == 200:
                body = response.json()
                if isinstance(body, dict) and body.get("code") not in (None, 0):
                    raise RuntimeError(f"GMGN code={body.get('code')} message={body.get('message')}")
                return body
            if response.status_code in (403, 408, 425, 429, 500, 502, 503, 504):
                raise RuntimeError(f"HTTP {response.status_code}: {response.text[:300]}")
            return None
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            time.sleep(min(1.0 + attempt * 1.5, 12.0))
    HTTP_STATUS[label] = {"url": url, "error": repr(last_error)}
    log(f"{label} failed after retries: {last_error!r}")
    return None


def event_key(event: dict[str, Any]) -> tuple[Any, ...]:
    return (
        event.get("tx_hash"),
        event.get("event"),
        event.get("maker"),
        event.get("timestamp"),
        event.get("base_amount"),
        event.get("quote_amount"),
        event.get("id"),
    )


def fetch_trade_ledger() -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    base_url = f"https://gmgn.ai/vas/api/v1/token_trades/sol/{MINT}"
    cursor: str | None = None
    seen_cursors: set[str] = set()
    seen_events: set[tuple[Any, ...]] = set()
    all_events: list[dict[str, Any]] = []
    page_log: list[dict[str, Any]] = []

    for page in range(1, MAX_PAGES + 1):
        params: dict[str, Any] = {
            "limit": PAGE_LIMIT,
            "maker": "",
            "tag": "",
            "revert": "true",
        }
        if cursor:
            params["cursor"] = cursor
        body = get_json(f"gmgn_trades_page_{page}", base_url, params=params)
        data = body.get("data") if isinstance(body, dict) else None
        history = data.get("history") if isinstance(data, dict) else None
        if not isinstance(history, list):
            page_log.append({"page": page, "cursor": cursor, "error": "no history list"})
            break

        added = 0
        timestamps: list[int] = []
        for raw in history:
            if not isinstance(raw, dict):
                continue
            key = event_key(raw)
            if key in seen_events:
                continue
            seen_events.add(key)
            all_events.append(raw)
            added += 1
            if raw.get("timestamp") not in (None, ""):
                timestamps.append(int(raw["timestamp"]))

        next_cursor = data.get("next") if isinstance(data, dict) else None
        row = {
            "page": page,
            "cursor": cursor,
            "next": next_cursor,
            "history_count": len(history),
            "new_count": added,
            "first_timestamp": min(timestamps) if timestamps else None,
            "first_utc": iso(min(timestamps)) if timestamps else None,
            "last_timestamp": max(timestamps) if timestamps else None,
            "last_utc": iso(max(timestamps)) if timestamps else None,
            "total_unique_events": len(all_events),
        }
        page_log.append(row)
        log(
            f"GMGN page {page}: {len(history)} rows/{added} new, "
            f"{row['first_utc']} -> {row['last_utc']}, total={len(all_events):,}"
        )

        if timestamps and max(timestamps) >= MIGRATION_TS + STOP_AFTER_SECONDS:
            break
        if not next_cursor or next_cursor == cursor or next_cursor in seen_cursors:
            break
        seen_cursors.add(str(next_cursor))
        cursor = str(next_cursor)
        time.sleep(0.12)

    all_events.sort(key=lambda row: (int(row.get("timestamp") or 0), str(row.get("id") or "")))
    return all_events, page_log


def tags_from(event: dict[str, Any], field: str) -> set[str]:
    value = event.get(field)
    if not isinstance(value, list):
        return set()
    return {str(item) for item in value if item not in (None, "")}


def timing_class(first_buy_ts: int | None) -> str:
    if not first_buy_ts:
        return "no-buy"
    if first_buy_ts <= CREATED_TS + 600:
        return "launch-window"
    seconds = MIGRATION_TS - first_buy_ts
    if seconds > 7 * 86400:
        return "old-holder"
    if seconds > 86400:
        return "week-before"
    if seconds > 6 * 3600:
        return "day-before"
    if seconds > 3600:
        return "six-hours-before"
    if seconds > 600:
        return "hour-before"
    if seconds >= 0:
        return "final-ten-minutes"
    return "post-migration"


def aggregate_wallets(events: list[dict[str, Any]]) -> list[dict[str, Any]]:
    groups: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for event in events:
        if event.get("event") not in ("buy", "sell"):
            continue
        maker = str(event.get("maker") or "")
        if maker:
            groups[maker].append(event)

    windows = {
        "7d": 7 * 86400,
        "24h": 86400,
        "6h": 6 * 3600,
        "1h": 3600,
        "30m": 1800,
        "10m": 600,
    }
    rows: list[dict[str, Any]] = []
    for wallet, wallet_events in groups.items():
        wallet_events.sort(key=lambda row: int(row.get("timestamp") or 0))
        prebond = [row for row in wallet_events if int(row.get("timestamp") or 0) <= MIGRATION_TS]
        buys = [row for row in prebond if row.get("event") == "buy"]
        sells = [row for row in prebond if row.get("event") == "sell"]
        if not buys and not sells:
            continue
        first_buy_ts = min((int(row["timestamp"]) for row in buys), default=None)
        last_buy_ts = max((int(row["timestamp"]) for row in buys), default=None)
        maker_tags: set[str] = set()
        maker_token_tags: set[str] = set()
        maker_event_tags: set[str] = set()
        for event in wallet_events:
            maker_tags |= tags_from(event, "maker_tags")
            maker_token_tags |= tags_from(event, "maker_token_tags")
            maker_event_tags |= tags_from(event, "maker_event_tags")

        record: dict[str, Any] = {
            "wallet": wallet,
            "timing_class": timing_class(first_buy_ts),
            "first_buy_ts": first_buy_ts,
            "first_buy_utc": iso(first_buy_ts),
            "first_buy_days_before_migration": round((MIGRATION_TS - first_buy_ts) / 86400, 5) if first_buy_ts else None,
            "last_buy_ts": last_buy_ts,
            "last_buy_utc": iso(last_buy_ts),
            "last_buy_minutes_before_migration": round((MIGRATION_TS - last_buy_ts) / 60, 3) if last_buy_ts else None,
            "buy_count_prebond": len(buys),
            "sell_count_prebond": len(sells),
            "buy_tokens_prebond": sum(num(row.get("base_amount")) for row in buys),
            "sell_tokens_prebond": sum(num(row.get("base_amount")) for row in sells),
            "net_tokens_prebond": (
                sum(num(row.get("base_amount")) for row in buys)
                - sum(num(row.get("base_amount")) for row in sells)
            ),
            "buy_sol_prebond": sum(num(row.get("quote_amount")) for row in buys),
            "sell_sol_prebond": sum(num(row.get("quote_amount")) for row in sells),
            "buy_usd_prebond": sum(num(row.get("amount_usd")) for row in buys),
            "sell_usd_prebond": sum(num(row.get("amount_usd")) for row in sells),
            "maker_tags": ",".join(sorted(maker_tags)),
            "maker_token_tags": ",".join(sorted(maker_token_tags)),
            "maker_event_tags": ",".join(sorted(maker_event_tags)),
            "gmgn_total_trade_snapshot": max((int(num(row.get("total_trade"))) for row in wallet_events), default=0),
            "gmgn_realized_profit_snapshot": max((num(row.get("realized_profit"), float("-inf")) for row in wallet_events), default=0.0),
            "gmgn_unrealized_profit_snapshot": max((num(row.get("unrealized_profit"), float("-inf")) for row in wallet_events), default=0.0),
        }
        for label, seconds in windows.items():
            cutoff = MIGRATION_TS - seconds
            scoped_buys = [row for row in buys if int(row.get("timestamp") or 0) >= cutoff]
            scoped_sells = [row for row in sells if int(row.get("timestamp") or 0) >= cutoff]
            record[f"buy_sol_{label}"] = sum(num(row.get("quote_amount")) for row in scoped_buys)
            record[f"buy_tokens_{label}"] = sum(num(row.get("base_amount")) for row in scoped_buys)
            record[f"net_tokens_{label}"] = (
                sum(num(row.get("base_amount")) for row in scoped_buys)
                - sum(num(row.get("base_amount")) for row in scoped_sells)
            )
            record[f"buy_count_{label}"] = len(scoped_buys)
        record["launch_bundle"] = (
            first_buy_ts is not None
            and first_buy_ts <= CREATED_TS + 600
            and "bundler" in maker_token_tags
        )
        record["late_signal_score"] = (
            record["buy_sol_24h"] * 14
            + record["buy_sol_6h"] * 10
            + record["buy_sol_1h"] * 7
            + record["buy_sol_10m"] * 5
            + max(0.0, record["net_tokens_24h"]) / 1_000_000
        )
        rows.append(record)

    rows.sort(key=lambda row: (num(row.get("late_signal_score")), num(row.get("buy_sol_prebond"))), reverse=True)
    return rows


def parse_holders(raw: Any) -> list[dict[str, Any]]:
    holders = (((raw or {}).get("gmgn_holders") or {}).get("data") or {}).get("list") or []
    rows: list[dict[str, Any]] = []
    for holder in holders:
        if not isinstance(holder, dict):
            continue
        native = holder.get("native_transfer") if isinstance(holder.get("native_transfer"), dict) else {}
        token_transfer = holder.get("token_transfer") if isinstance(holder.get("token_transfer"), dict) else {}
        start_ts = int(holder.get("start_holding_at") or 0)
        tags = holder.get("tags") if isinstance(holder.get("tags"), list) else []
        token_tags = holder.get("maker_token_tags") if isinstance(holder.get("maker_token_tags"), list) else []
        row = {
            "wallet": holder.get("address"),
            "token_account": holder.get("account_address"),
            "rank": holder.get("wallet_tag_v2"),
            "addr_type": holder.get("addr_type"),
            "exchange": holder.get("exchange"),
            "current_balance": holder.get("balance"),
            "current_supply_pct": num(holder.get("amount_percentage")) * 100,
            "current_usd_value": holder.get("usd_value"),
            "start_holding_ts": start_ts,
            "start_holding_utc": iso(start_ts),
            "start_minutes_before_migration": round((MIGRATION_TS - start_ts) / 60, 3) if start_ts else None,
            "holder_timing_class": timing_class(start_ts),
            "is_on_curve": holder.get("is_on_curve"),
            "is_new": holder.get("is_new"),
            "is_suspicious": holder.get("is_suspicious"),
            "transfer_in": holder.get("transfer_in"),
            "buy_volume_cur": holder.get("buy_volume_cur"),
            "buy_amount_cur": holder.get("buy_amount_cur"),
            "sell_volume_cur": holder.get("sell_volume_cur"),
            "sell_amount_cur": holder.get("sell_amount_cur"),
            "buy_tx_count_cur": holder.get("buy_tx_count_cur"),
            "sell_tx_count_cur": holder.get("sell_tx_count_cur"),
            "history_bought_cost": holder.get("history_bought_cost"),
            "history_sold_income": holder.get("history_sold_income"),
            "profit": holder.get("profit"),
            "profit_change": holder.get("profit_change"),
            "realized_profit": holder.get("realized_profit"),
            "unrealized_profit": holder.get("unrealized_profit"),
            "avg_cost": holder.get("avg_cost"),
            "avg_sold": holder.get("avg_sold"),
            "native_funder": native.get("from_address"),
            "native_funding_amount": native.get("amount"),
            "native_funding_ts": native.get("timestamp"),
            "native_funding_utc": iso(native.get("timestamp")),
            "native_funding_tx": native.get("tx_hash"),
            "token_transfer_type": token_transfer.get("type"),
            "tags": ",".join(sorted(str(tag) for tag in tags)),
            "maker_token_tags": ",".join(sorted(str(tag) for tag in token_tags)),
            "gmgn_name": holder.get("name"),
            "gmgn_twitter_username": holder.get("twitter_username"),
            "wallet_created_ts": holder.get("created_at"),
            "wallet_created_utc": iso(holder.get("created_at")),
        }
        rows.append(row)
    return rows


def merge_wallet_and_holder(wallets: list[dict[str, Any]], holders: list[dict[str, Any]]) -> list[dict[str, Any]]:
    by_wallet = {str(row.get("wallet")): row for row in holders if row.get("wallet")}
    merged: list[dict[str, Any]] = []
    for wallet in wallets:
        holder = by_wallet.get(str(wallet.get("wallet")))
        row = dict(wallet)
        if holder:
            for key, value in holder.items():
                if key != "wallet":
                    row[f"holder_{key}"] = value
        row["currently_top_holder"] = holder is not None
        merged.append(row)
    return merged


def build_minute_bars(events: list[dict[str, Any]]) -> list[dict[str, Any]]:
    trades = [
        row for row in events
        if row.get("event") in ("buy", "sell")
        and int(row.get("timestamp") or 0) <= MIGRATION_TS + STOP_AFTER_SECONDS
        and num(row.get("price_usd")) > 0
    ]
    buckets: dict[int, list[dict[str, Any]]] = defaultdict(list)
    for trade in trades:
        minute = (int(trade["timestamp"]) // 60) * 60
        buckets[minute].append(trade)
    bars: list[dict[str, Any]] = []
    for minute, rows in sorted(buckets.items()):
        rows.sort(key=lambda row: (int(row.get("timestamp") or 0), str(row.get("id") or "")))
        prices = [num(row.get("price_usd")) for row in rows if num(row.get("price_usd")) > 0]
        buys = [row for row in rows if row.get("event") == "buy"]
        sells = [row for row in rows if row.get("event") == "sell"]
        if not prices:
            continue
        bars.append({
            "minute_ts": minute,
            "utc": iso(minute),
            "open": prices[0],
            "high": max(prices),
            "low": min(prices),
            "close": prices[-1],
            "open_mcap": prices[0] * SUPPLY,
            "high_mcap": max(prices) * SUPPLY,
            "close_mcap": prices[-1] * SUPPLY,
            "buy_sol": sum(num(row.get("quote_amount")) for row in buys),
            "sell_sol": sum(num(row.get("quote_amount")) for row in sells),
            "buy_usd": sum(num(row.get("amount_usd")) for row in buys),
            "sell_usd": sum(num(row.get("amount_usd")) for row in sells),
            "buy_count": len(buys),
            "sell_count": len(sells),
            "unique_buyers": len({str(row.get("maker")) for row in buys}),
        })
    for index, bar in enumerate(bars):
        for minutes in (1, 5, 10, 30, 60):
            target_ts = bar["minute_ts"] - minutes * 60
            prior = None
            for candidate in reversed(bars[:index]):
                if candidate["minute_ts"] <= target_ts:
                    prior = candidate
                    break
            if prior and num(prior.get("close")) > 0:
                bar[f"return_{minutes}m"] = num(bar["close"]) / num(prior["close"]) - 1
                bar[f"mcap_change_{minutes}m"] = num(bar["close_mcap"]) - num(prior["close_mcap"])
            else:
                bar[f"return_{minutes}m"] = None
                bar[f"mcap_change_{minutes}m"] = None
    return bars


def select_major_legs(bars: list[dict[str, Any]], max_legs: int = 12) -> list[dict[str, Any]]:
    candidates = [
        dict(row) for row in bars
        if row.get("return_5m") is not None
        and (num(row.get("return_5m")) >= 0.20 or num(row.get("mcap_change_5m")) >= 20_000)
    ]
    candidates.sort(key=lambda row: (num(row.get("mcap_change_5m")), num(row.get("return_5m"))), reverse=True)
    chosen: list[dict[str, Any]] = []
    for row in candidates:
        if any(abs(int(row["minute_ts"]) - int(existing["minute_ts"])) < 6 * 60 for existing in chosen):
            continue
        chosen.append(row)
        if len(chosen) >= max_legs:
            break
    chosen.sort(key=lambda row: int(row["minute_ts"]))
    for index, row in enumerate(chosen, start=1):
        row["leg_id"] = index
    return chosen


def wallets_before_legs(events: list[dict[str, Any]], legs: list[dict[str, Any]]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for leg in legs:
        leg_ts = int(leg["minute_ts"])
        for window_minutes in (5, 10, 30, 60):
            start = leg_ts - window_minutes * 60
            scoped = [
                event for event in events
                if event.get("event") == "buy"
                and start <= int(event.get("timestamp") or 0) <= leg_ts + 59
            ]
            grouped: dict[str, list[dict[str, Any]]] = defaultdict(list)
            for event in scoped:
                maker = str(event.get("maker") or "")
                if maker:
                    grouped[maker].append(event)
            for wallet, buys in grouped.items():
                rows.append({
                    "leg_id": leg["leg_id"],
                    "leg_utc": leg["utc"],
                    "leg_return_5m": leg.get("return_5m"),
                    "leg_mcap_change_5m": leg.get("mcap_change_5m"),
                    "window_minutes": window_minutes,
                    "wallet": wallet,
                    "buy_count": len(buys),
                    "buy_sol": sum(num(row.get("quote_amount")) for row in buys),
                    "buy_tokens": sum(num(row.get("base_amount")) for row in buys),
                    "buy_usd": sum(num(row.get("amount_usd")) for row in buys),
                    "first_buy_utc": iso(min(int(row["timestamp"]) for row in buys)),
                    "last_buy_seconds_before_leg": leg_ts - max(int(row["timestamp"]) for row in buys),
                    "maker_tags": ",".join(sorted(set().union(*(tags_from(row, "maker_tags") for row in buys)))),
                    "maker_token_tags": ",".join(sorted(set().union(*(tags_from(row, "maker_token_tags") for row in buys)))),
                })
    rows.sort(key=lambda row: (int(row["leg_id"]), int(row["window_minutes"]), num(row["buy_sol"])), reverse=True)
    return rows


def enrich_wallet_stats(wallets: list[dict[str, Any]]) -> list[dict[str, Any]]:
    output: list[dict[str, Any]] = []
    for index, wallet_row in enumerate(wallets[:MAX_WALLET_STATS], start=1):
        wallet = str(wallet_row["wallet"])
        body = get_json(
            f"gmgn_wallet_stats_{index}",
            f"https://gmgn.ai/defi/quotation/v1/smartmoney/sol/walletNew/{wallet}",
            params={"period": "7d"},
            retries=5,
        )
        data = body.get("data") if isinstance(body, dict) else None
        if isinstance(data, dict):
            output.append({
                "wallet": wallet,
                "late_signal_score": wallet_row.get("late_signal_score"),
                "total_profit_pnl": data.get("total_profit_pnl"),
                "realized_profit_7d": data.get("realized_profit_7d"),
                "realized_profit_30d": data.get("realized_profit_30d"),
                "winrate": data.get("winrate"),
                "sol_balance": data.get("sol_balance"),
                "buy_7d": data.get("buy_7d"),
                "sell_7d": data.get("sell_7d"),
                "buy_30d": data.get("buy_30d"),
                "sell_30d": data.get("sell_30d"),
                "avg_holding_period_seconds": data.get("avg_holding_peroid"),
                "tags": data.get("tags"),
            })
        if index % 10 == 0:
            log(f"GMGN wallet stats: {index}/{min(len(wallets), MAX_WALLET_STATS)}")
        time.sleep(0.12)
    return output


def run() -> None:
    raw_path = OUT / "supplemental_raw.json"
    raw = json.loads(raw_path.read_text(encoding="utf-8")) if raw_path.exists() else {}

    events, page_log = fetch_trade_ledger()
    prebond_events = [row for row in events if int(row.get("timestamp") or 0) <= MIGRATION_TS]
    write_json("gmgn_pagination_log.json", page_log)
    write_csv("gmgn_full_ledger_through_migration.csv", [
        {
            **row,
            "utc": iso(row.get("timestamp")),
            "implied_mcap_usd": num(row.get("price_usd")) * SUPPLY,
        }
        for row in events
    ])

    wallets = aggregate_wallets(events)
    holders = parse_holders(raw)
    merged = merge_wallet_and_holder(wallets, holders)
    bars = build_minute_bars(events)
    legs = select_major_legs(bars)
    leg_wallets = wallets_before_legs(events, legs)

    write_csv("gmgn_prebond_wallets.csv", merged)
    write_csv("gmgn_current_holders.csv", holders)
    write_csv("gmgn_minute_bars.csv", bars)
    write_csv("gmgn_major_price_legs.csv", legs)
    write_csv("gmgn_wallets_before_price_legs.csv", leg_wallets)

    late = [
        row for row in merged
        if row.get("timing_class") in {
            "week-before", "day-before", "six-hours-before", "hour-before", "final-ten-minutes"
        }
        and num(row.get("net_tokens_prebond")) > 0
    ]
    late.sort(key=lambda row: (num(row.get("late_signal_score")), num(row.get("buy_sol_prebond"))), reverse=True)
    launch_bundles = [row for row in merged if row.get("launch_bundle")]
    old_holders = [row for row in merged if row.get("timing_class") == "old-holder"]

    holder_prebond = [
        row for row in holders
        if int(row.get("addr_type") or 0) == 0
        and int(row.get("start_holding_ts") or 0) <= MIGRATION_TS
    ]
    holder_prebond.sort(
        key=lambda row: (
            -abs(MIGRATION_TS - int(row.get("start_holding_ts") or 0)),
            num(row.get("history_bought_cost")),
            num(row.get("current_balance")),
        ),
        reverse=True,
    )

    funder_groups: dict[str, list[str]] = defaultdict(list)
    for row in holder_prebond:
        funder = str(row.get("native_funder") or "")
        wallet = str(row.get("wallet") or "")
        if funder and wallet:
            funder_groups[funder].append(wallet)
    shared_funders = [
        {"funder": funder, "wallet_count": len(set(wallets_)), "wallets": sorted(set(wallets_))}
        for funder, wallets_ in funder_groups.items()
        if len(set(wallets_)) >= 2
    ]
    shared_funders.sort(key=lambda row: row["wallet_count"], reverse=True)

    wallet_stats = enrich_wallet_stats(late + launch_bundles + old_holders)
    write_csv("gmgn_candidate_wallet_stats.csv", wallet_stats)

    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "mint": MINT,
        "pool": POOL,
        "creator": CREATOR,
        "created_utc": iso(CREATED_TS),
        "migration_utc": iso(MIGRATION_TS),
        "pages_fetched": len(page_log),
        "ledger_events_fetched": len(events),
        "prebond_events": len(prebond_events),
        "unique_prebond_wallets": len(wallets),
        "late_accumulator_count": len(late),
        "launch_bundle_wallet_count": len(launch_bundles),
        "old_holder_count": len(old_holders),
        "current_top_holders_started_prebond": len(holder_prebond),
        "major_price_leg_count": len(legs),
        "shared_native_funders": shared_funders,
        "top_late_accumulators": late[:40],
        "launch_bundles": launch_bundles[:40],
        "top_current_prebond_holders": holder_prebond[:40],
        "major_price_legs": legs,
        "top_wallets_before_price_legs": [
            row for row in sorted(
                [item for item in leg_wallets if item.get("window_minutes") == 10],
                key=lambda item: (int(item["leg_id"]), num(item["buy_sol"])),
                reverse=True,
            )
        ][:80],
        "methodology": [
            "GMGN's cursor-paginated indexed token ledger was followed from launch through five minutes after migration.",
            "Only buy/sell events at or before the exact PumpSwap pair-creation timestamp are classified as pre-bond.",
            "Launch bundles are separated from later wallets, so launch inventory is not mislabeled as predictive accumulation.",
            "Minute bars and major legs are reconstructed from indexed trade timestamps and price_usd fields.",
            "Current holder/funder fields are GMGN labels and clustering leads; a shared funder is not proof of common control.",
        ],
    }
    write_json("gmgn_forensic_summary.json", summary)
    write_json("gmgn_http_status.json", HTTP_STATUS)
    (OUT / "gmgn_forensics.log").write_text("\n".join(LOG) + "\n", encoding="utf-8")
    log("GMGN forensic reconstruction complete")


if __name__ == "__main__":
    try:
        run()
    except Exception as exc:  # noqa: BLE001
        log(f"FATAL: {exc!r}")
        (OUT / "gmgn_traceback.txt").write_text(traceback.format_exc(), encoding="utf-8")
        write_json("gmgn_http_status.json", HTTP_STATUS)
        (OUT / "gmgn_forensics.log").write_text("\n".join(LOG) + "\n", encoding="utf-8")
        raise
