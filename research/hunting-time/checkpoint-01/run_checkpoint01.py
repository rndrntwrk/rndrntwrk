#!/usr/bin/env python3
"""Run Hunting Time checkpoint 01 only.

This script performs no candidate generation and no puzzle search. It verifies:
- live escrow state through two public Esplora-compatible services;
- independent BIP84 and Electrum oracle witnesses;
- exact pinned Electrum source semantics;
- original clue image hashes and a canonical evidence hash set;
- absence of a positive/private match marker in prior result data.
"""
from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import re
import sys
import time
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

TARGET_ADDRESS = "bc1qhzy6j4amw26z7e694mgfr7kvzl7xteu54f0a85"
EXPECTED_REWARD_SATS = 420_000
ELECTRUM_COMMIT = "bc37f9c5293a121bed6955a3ce6c152d14695fd0"


def request_bytes(url: str) -> bytes:
    last_error: Exception | None = None
    for attempt in range(1, 5):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "accept": "application/json,text/plain,*/*",
                    "user-agent": "Hunting-Time-Checkpoint-01/1.0",
                },
            )
            with urllib.request.urlopen(req, timeout=30) as response:
                return response.read()
        except Exception as exc:  # pragma: no cover - network path
            last_error = exc
            if attempt == 4:
                raise
            time.sleep(attempt * 2)
    raise RuntimeError("request failed") from last_error


def fetch_json(out_dir: Path, name: str, url: str) -> Any:
    body = request_bytes(url)
    obj = json.loads(body)
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / f"{name}.json").write_bytes(body)
    (out_dir / f"{name}.pretty.json").write_text(
        json.dumps(obj, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    return obj


def summarize_address(obj: dict[str, Any]) -> dict[str, int]:
    chain = obj["chain_stats"]
    mempool = obj["mempool_stats"]
    confirmed = int(chain["funded_txo_sum"]) - int(chain["spent_txo_sum"])
    pending = int(mempool["funded_txo_sum"]) - int(mempool["spent_txo_sum"])
    return {
        "confirmed_balance_sats": confirmed,
        "pending_balance_sats": pending,
        "total_balance_sats": confirmed + pending,
        "confirmed_tx_count": int(chain["tx_count"]),
        "pending_tx_count": int(mempool["tx_count"]),
        "confirmed_funded_txo_sum": int(chain["funded_txo_sum"]),
        "confirmed_spent_txo_sum": int(chain["spent_txo_sum"]),
    }


def normalize_utxos(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    for item in items:
        status = item.get("status") or {}
        rows.append(
            {
                "txid": item["txid"],
                "vout": int(item["vout"]),
                "value": int(item["value"]),
                "confirmed": bool(status.get("confirmed")),
                "block_height": status.get("block_height"),
                "block_hash": status.get("block_hash"),
            }
        )
    return sorted(rows, key=lambda row: (row["txid"], row["vout"]))


def load_oracle(root: Path):
    oracle_path = root / "research/hunting-time/checkpoint-01/oracle_checkpoint01.py"
    spec = importlib.util.spec_from_file_location("checkpoint_oracle", oracle_path)
    if spec is None or spec.loader is None:
        raise RuntimeError("could not load checkpoint oracle")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def verify_official_electrum_source(out: Path, oracle_selftests: dict[str, Any]) -> dict[str, Any]:
    official_dir = out / "official-electrum-source"
    official_dir.mkdir(parents=True, exist_ok=True)
    urls = {
        "mnemonic.py": (
            f"https://raw.githubusercontent.com/spesmilo/electrum/{ELECTRUM_COMMIT}/"
            "electrum/mnemonic.py"
        ),
        "keystore.py": (
            f"https://raw.githubusercontent.com/spesmilo/electrum/{ELECTRUM_COMMIT}/"
            "electrum/keystore.py"
        ),
        "test_mnemonic.py": (
            f"https://raw.githubusercontent.com/spesmilo/electrum/{ELECTRUM_COMMIT}/"
            "tests/test_mnemonic.py"
        ),
    }
    sources: dict[str, str] = {}
    for name, url in urls.items():
        body = request_bytes(url)
        (official_dir / name).write_bytes(body)
        sources[name] = body.decode("utf-8")

    phrase = "wild father tree among universe such mobile favorite target dynamic credit identify"
    expected_seed_hex = (
        "aac2a6302e48577ab4b46f23dbae0774e2e62c796f797d0a1b5faeb528301e3"
        "064342dafb79069e7c4c6b8c38ae11d7a973bec0d4f70626f8cc5184a8d0b0756"
    )
    assertions = {
        "pbkdf2_uses_electrum_salt": (
            "b'electrum' + passphrase.encode('utf-8')" in sources["mnemonic.py"]
        ),
        "pbkdf2_rounds_2048": "PBKDF2_ROUNDS = 2048" in sources["mnemonic.py"],
        "seed_version_hmac": (
            'hmac_oneshot(b"Seed version"' in sources["mnemonic.py"]
        ),
        "segwit_derivation_prefix_m_0_hardened": (
            'der = "m/0\'/"' in sources["keystore.py"]
        ),
        "official_test_phrase_present": phrase in sources["test_mnemonic.py"],
        "official_test_seed_present": expected_seed_hex in sources["test_mnemonic.py"],
    }
    if not all(assertions.values()):
        raise AssertionError(f"official Electrum source assertion failed: {assertions}")
    result = {
        "passed": True,
        "commit": ELECTRUM_COMMIT,
        "assertions": assertions,
        "source_files": [
            {
                "path": name,
                "sha256": hashlib.sha256((official_dir / name).read_bytes()).hexdigest(),
                "bytes": (official_dir / name).stat().st_size,
            }
            for name in sorted(urls)
        ],
        "independent_first_receiving_address": oracle_selftests[
            "electrum_seed_vector"
        ]["independent_address"],
        "full_path": "m/0'/0/0",
    }
    (out / "official-electrum-source-check.json").write_text(
        json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    return result


def verify_source_hashes(root: Path, out: Path) -> list[dict[str, Any]]:
    manifest = root / "public-media-analysis/SHA256SUMS"
    records: list[dict[str, Any]] = []
    for line in manifest.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        expected, rel = line.split(None, 1)
        path = root / rel.strip()
        actual = hashlib.sha256(path.read_bytes()).hexdigest() if path.exists() else None
        records.append(
            {
                "path": rel.strip(),
                "expected": expected,
                "actual": actual,
                "exists": path.exists(),
                "ok": actual == expected,
            }
        )
    if len(records) != 12 or not all(row["ok"] for row in records):
        raise AssertionError("original clue-image hash verification failed")
    (out / "source-sha256-verification.json").write_text(
        json.dumps(records, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    return records


def hash_canonical_artifacts(root: Path, out: Path) -> list[dict[str, Any]]:
    required = [
        *[f"public-media-analysis/clue-{i:02d}.jpg" for i in range(1, 13)],
        "public-media-analysis/cover-post/media-01.jpg",
        "public-media-analysis/flat-cover-post/media-01.jpg",
        "public-media-analysis/product-evidence/cover.jpg",
        "public-media-analysis/wordlists/bip39-english.txt",
        "public-media-analysis/hidden-pages-v2/compact.json",
        "public-media-analysis/page-map/summary.json",
        "public-media-analysis/position-pages/hits.jsonl",
        "public-media-analysis/target-pages/summary.json",
        "public-media-analysis/targeted-vision-v4/results.json",
        "public-media-analysis/numeric-ocr-fast-v2/results.json",
        "public-media-analysis/sample-pages/page-window.json",
        "public-media-analysis/conversations/reply-ledger.json",
        "public-media-analysis/SHA256SUMS",
        "research/hunting-time/checkpoint-01/oracle_checkpoint01.py",
        "research/hunting-time/checkpoint-01/run_checkpoint01.py",
    ]
    hashes: list[dict[str, Any]] = []
    for rel in required:
        path = root / rel
        if not path.exists():
            raise FileNotFoundError(rel)
        hashes.append(
            {
                "path": rel,
                "size": path.stat().st_size,
                "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            }
        )
    (out / "artifact-hashes.json").write_text(
        json.dumps(hashes, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    with (out / "artifact-hashes.tsv").open("w", encoding="utf-8") as handle:
        handle.write("sha256\tsize\tpath\n")
        for row in hashes:
            handle.write(f"{row['sha256']}\t{row['size']}\t{row['path']}\n")
    return hashes


def audit_private_match(root: Path, out: Path) -> dict[str, Any]:
    data_suffixes = {".json", ".jsonl", ".log", ".txt", ".csv"}
    excluded_prefixes = {
        "research/hunting-time/checkpoint-01-output",
        "research/hunting-time/checkpoint-01-v2",
        "research/hunting-time/checkpoint-01",
        "public-media-analysis/amazon-reader-js",
        "public-media-analysis/index-parser",
        "public-media-analysis/search-service-source",
    }
    suspicious_names: list[str] = []
    exact_markers: list[str] = []
    for base in [root / "public-media-analysis", root / "research"]:
        if not base.exists():
            continue
        for path in base.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in data_suffixes:
                continue
            rel = str(path.relative_to(root))
            if any(rel == prefix or rel.startswith(prefix + "/") for prefix in excluded_prefixes):
                continue
            if re.search(
                r"MATCH_FOUND_PRIVATE|private[-_ ].*match|winner[-_ ].*seed",
                path.name,
                re.I,
            ):
                suspicious_names.append(rel)
            if path.stat().st_size > 20_000_000:
                continue
            data = path.read_bytes()
            if re.search(rb"MATCH_FOUND_PRIVATE", data, re.I) or re.search(
                rb'"exact_match"\s*:\s*true', data, re.I
            ):
                exact_markers.append(rel)
    result = {
        "passed": not suspicious_names and not exact_markers,
        "suspicious_filenames": sorted(suspicious_names),
        "exact_match_marker_files": sorted(exact_markers),
    }
    if not result["passed"]:
        raise AssertionError(f"private match audit failed: {result}")
    (out / "private-match-audit.json").write_text(
        json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path.cwd())
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("research/hunting-time/checkpoint-01-output"),
    )
    parser.add_argument("--github-run-id", default="")
    parser.add_argument("--github-sha", default="")
    args = parser.parse_args()

    root = args.root.resolve()
    out = args.output
    if not out.is_absolute():
        out = root / out
    out.mkdir(parents=True, exist_ok=True)
    live_dir = out / "live"
    checked_at = datetime.now(timezone.utc).isoformat()

    endpoints = {
        "mempool_address": f"https://mempool.space/api/address/{TARGET_ADDRESS}",
        "mempool_utxo": f"https://mempool.space/api/address/{TARGET_ADDRESS}/utxo",
        "mempool_txs": f"https://mempool.space/api/address/{TARGET_ADDRESS}/txs",
        "blockstream_address": f"https://blockstream.info/api/address/{TARGET_ADDRESS}",
        "blockstream_utxo": f"https://blockstream.info/api/address/{TARGET_ADDRESS}/utxo",
        "blockstream_txs": f"https://blockstream.info/api/address/{TARGET_ADDRESS}/txs",
    }
    live = {name: fetch_json(live_dir, name, url) for name, url in endpoints.items()}
    mempool_summary = summarize_address(live["mempool_address"])
    blockstream_summary = summarize_address(live["blockstream_address"])
    mempool_utxos = normalize_utxos(live["mempool_utxo"])
    blockstream_utxos = normalize_utxos(live["blockstream_utxo"])
    utxo_sum = sum(row["value"] for row in mempool_utxos)
    services_agree = (
        mempool_summary == blockstream_summary
        and mempool_utxos == blockstream_utxos
        and utxo_sum == mempool_summary["total_balance_sats"]
    )
    if not services_agree:
        raise AssertionError("mempool.space and Blockstream snapshots disagree")

    oracle = load_oracle(root)
    oracle_selftests = oracle.run_selftests()
    (out / "oracle-selftests.json").write_text(
        json.dumps(oracle_selftests, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    official_source_check = verify_official_electrum_source(out, oracle_selftests)
    source_records = verify_source_hashes(root, out)
    hashes = hash_canonical_artifacts(root, out)
    private_audit = audit_private_match(root, out)

    txids = sorted({tx["txid"] for tx in live["mempool_txs"]})
    result = {
        "checkpoint": "01",
        "status": "COMPLETE",
        "checked_at_utc": checked_at,
        "target_address": TARGET_ADDRESS,
        "expected_reward_sats": EXPECTED_REWARD_SATS,
        "live_escrow": {
            "services": ["mempool.space", "Blockstream Esplora"],
            "services_agree": services_agree,
            "confirmed_balance_sats": mempool_summary["confirmed_balance_sats"],
            "pending_balance_sats": mempool_summary["pending_balance_sats"],
            "total_balance_sats": mempool_summary["total_balance_sats"],
            "confirmed_tx_count": mempool_summary["confirmed_tx_count"],
            "pending_tx_count": mempool_summary["pending_tx_count"],
            "utxo_count": len(mempool_utxos),
            "utxo_sum_sats": utxo_sum,
            "utxos": mempool_utxos,
            "transaction_ids": txids,
            "full_expected_reward_present": utxo_sum == EXPECTED_REWARD_SATS,
        },
        "oracle": {
            "independent_selftests": oracle_selftests,
            "official_source_check": official_source_check,
            "primary_path": "m/0'/0/i",
            "seed_version_prefix": "100",
            "bip39_checksum_required_for_primary": False,
        },
        "integrity": {
            "clue_hashes_passed": len(source_records) == 12 and all(r["ok"] for r in source_records),
            "canonical_artifact_count": len(hashes),
            "private_match_audit": private_audit,
        },
        "candidate_search_ran": False,
        "exact_match_found": False,
        "github_run_id": args.github_run_id,
        "github_sha": args.github_sha,
        "next_checkpoint": "02 — Twelve-clue evidence matrix",
    }
    (out / "result.json").write_text(
        json.dumps(result, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )

    report = f"""# Hunting Time — Checkpoint 01 report

**Checkpoint:** 01 — Escrow, oracle, and artifact integrity  
**Status:** COMPLETE  
**Checked:** {checked_at}

## Inputs frozen

- Target: `{TARGET_ADDRESS}`
- Expected incentive: 420,000 sats / 0.0042 BTC
- Primary wallet model: Electrum native segwit
- Primary path: `m/0'/0/i`
- Original clue photographs: 12

## Work completed

- Queried mempool.space and Blockstream Esplora directly.
- Compared normalized address summaries and UTXO sets.
- Ran the official BIP84 test vector through the independent oracle.
- Ran Electrum's fixed mnemonic/PBKDF2/version vector through the independent oracle.
- Pinned and checked the exact official Electrum source commit `{ELECTRUM_COMMIT}`.
- Verified all twelve original photograph hashes.
- Hashed {len(hashes)} canonical evidence and oracle artifacts.
- Audited result data for a private or exact-match artifact.
- Generated no new candidate phrases and ran no puzzle search.

## Live escrow

- Confirmed balance: **{mempool_summary['confirmed_balance_sats']:,} sats**
- Pending balance: **{mempool_summary['pending_balance_sats']:,} sats**
- UTXOs: **{len(mempool_utxos)}**
- UTXO sum: **{utxo_sum:,} sats**
- Public transactions observed: **{len(txids)}**
- Independent explorers agree: **{str(services_agree).lower()}**
- Complete expected reward present: **{str(utxo_sum == EXPECTED_REWARD_SATS).lower()}**

## Oracle verification

- Official BIP84 vector: **PASS**
- Electrum fixed seed/PBKDF2 vector: **PASS**
- Electrum version prefix `100`: **PASS**
- Official Electrum derivation source `m/0'/` at the pinned commit: **PASS**
- Independent first receiving path: `m/0'/0/0`
- Independent vector address: `{oracle_selftests['electrum_seed_vector']['independent_address']}`

## Integrity and private-match audit

- Original clue hashes: **12/12 PASS**
- Canonical artifacts hashed: **{len(hashes)}**
- Suspicious private-match filenames: **{len(private_audit['suspicious_filenames'])}**
- Files containing a positive exact-match marker: **{len(private_audit['exact_match_marker_files'])}**
- Private-match audit: **PASS**

## Exact-match result

**No exact match was found.** This checkpoint did not search candidate phrases.

## Next checkpoint

**Checkpoint 02 — Twelve-clue evidence matrix.**
"""
    (out / "report.md").write_text(report, encoding="utf-8")
    print(json.dumps(result, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
