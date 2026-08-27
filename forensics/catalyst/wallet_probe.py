#!/usr/bin/env python3
"""Fetch raw GMGN wallet profiles for the highest-signal catalyst wallets."""
from __future__ import annotations

import csv
import json
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from typing import Any

from curl_cffi import requests

OUT = Path("forensics/catalyst/output")
OUT.mkdir(parents=True, exist_ok=True)

WALLETS = [
    "5xVpr2eKDMPE5KxqmwnRguMGZn6wYNsVUP7v5Nsn9bGo",
    "BpkUrCNKAiiSx9m5jnUCTEQsqPnftGVwzNA6tP4YQU97",
    "5ih6q7x839yQR18UvgsyB7n23i4he4wyEzsD3TSu6tr3",
    "EDXHdSFdadFbYFFjxPXBqMe1kCEDFqpPu552uvp48HR8",
    "HX8jXnkcQW3KaEtQHeXmwZKfZbUtbN8JUaydG5jscw5V",
    "2yavzzNeqWjtUBXYR7Fx8RhdbWNHDfRcRhx6VuexLFjT",
    "7obWefa4XK7KPZuLKia3zLHjGBkXwuMSRdaGNtZCcbyx",
    "Gmh3Wt423pU6GsS3FQyZjknifnAFW7g3J8HhbF2TrbZL",
    "9GBsoKrngqmLcqf6ELncpEjVxAgGoaseuDBhVZrmtJer",
    "7fnq9wNj5WoMxasNcWNWS88peQjdWb1m5k8qS7grxGt2",
    "2dqe7VxbsajyPU1nVAJhgQYC2yGGEZLJJwW2yeNCq9rt",
    "9G7Vq23iCSq2GmY94exbpzckbS4UDSPt3nTn98b72bxM",
    "5qWge4zUyQenk53EhAAQ5yP4LWxuvdqJpRBZZbGd4tv9",
    "ArhaoyHT6D7PsumcAN7uPNg5cocAyEjhufs5uHnJvyuS",
    "J9kq1ZG94X4ujaWeodSLK8Cv5fjQRAU27zeT5SiC74cP",
    "GKAyb1Jox3qzjn3EHed83x9fZM8QcVZ2gV6aYCgr7PNs",
    "HfbNikRyQP4qFEbQVUCbL5njKHC1FGPVCKCK28sznBw5",
    "9iFgPXwrU6GToh3VW9TN1QG7QecYhJJXb4RLSHzpEoLb",
    "FN5bhcBfv7sCtBMPHabu9H7JH8MwdbqfEdPieGMAJ25N",
    "Cip99wg8DAMCRkk4eXLkv1jxmagwQ6Tuj8w1JGDQdY6y",
    "Bzzy8fSPnhWNMb8Rc3SkJGWoDMf9rs934bDRMRZPmCYT",
    "CXNC1TTiF7Z3o1pFr9yH1spZLeWygQ5gPXgCt7Rz6trb",
    "6dtUFfjQfQ35tkwGRMs3NFsF9sYn3mRV4UtGaC4uBh8J",
    "FHgfsbUcqdd9iXY75yN2KErCnVsxNYwo486nYzFuTVc8",
    "3VjkDRH1M9mZ9gNfHWzTmSvydJ6CwXamsN74rndZrrpk",
    "9H8xpLFE9p7kHDJG3S2JLqigy1VuvuohgFfECnVJtUBj",
    "F5CymCUo7E2MQGxfYFxBSTk6PaBbQyqMporpPdu6iWF9",
    "3tgpbmw99da6WFPfPh7uRPMLpEhSjuj8JMRXrPD2wiYA",
]

HEADERS = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "referer": "https://gmgn.ai/?chain=sol",
    "origin": "https://gmgn.ai",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",
}


def fetch(wallet: str, period: str) -> tuple[str, str, Any]:
    session = requests.Session(impersonate="chrome")
    url = f"https://gmgn.ai/defi/quotation/v1/smartmoney/sol/walletNew/{wallet}"
    last: Exception | None = None
    for attempt in range(6):
        try:
            response = session.get(url, params={"period": period}, headers=HEADERS, timeout=45)
            if response.status_code == 200:
                return wallet, period, response.json()
            last = RuntimeError(f"HTTP {response.status_code}: {response.text[:300]}")
        except Exception as exc:  # noqa: BLE001
            last = exc
        time.sleep(1 + attempt * 1.5)
    return wallet, period, {"error": repr(last)}


def flatten(prefix: str, value: Any, row: dict[str, Any]) -> None:
    if isinstance(value, dict):
        for key, child in value.items():
            flatten(f"{prefix}.{key}" if prefix else str(key), child, row)
    elif isinstance(value, list):
        row[prefix] = json.dumps(value, ensure_ascii=False)
    else:
        row[prefix] = value


def main() -> None:
    raw: dict[str, dict[str, Any]] = {wallet: {} for wallet in WALLETS}
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = [executor.submit(fetch, wallet, period) for wallet in WALLETS for period in ("7d", "30d")]
        for future in as_completed(futures):
            wallet, period, body = future.result()
            raw[wallet][period] = body

    (OUT / "gmgn_candidate_wallet_raw.json").write_text(
        json.dumps(raw, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    rows: list[dict[str, Any]] = []
    for wallet, periods in raw.items():
        for period, body in periods.items():
            row: dict[str, Any] = {"wallet": wallet, "requested_period": period}
            flatten("", body, row)
            rows.append(row)

    fields: list[str] = []
    seen: set[str] = set()
    for row in rows:
        for key in row:
            if key not in seen:
                seen.add(key)
                fields.append(key)
    with (OUT / "gmgn_candidate_wallet_raw_flat.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)

    schema: dict[str, list[str]] = {}
    for wallet, periods in raw.items():
        for period, body in periods.items():
            data = body.get("data") if isinstance(body, dict) else None
            if isinstance(data, dict):
                schema[f"{wallet}:{period}"] = sorted(data.keys())
    (OUT / "gmgn_candidate_wallet_schema.json").write_text(
        json.dumps(schema, indent=2), encoding="utf-8"
    )


if __name__ == "__main__":
    main()
