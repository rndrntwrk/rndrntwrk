from __future__ import annotations

import concurrent.futures
import json
import random
import threading
import time
import urllib.parse
import urllib.request
from pathlib import Path

ASIN = "B0FRGB2PMR"
ENDPOINT = "https://read.amazon.com/sample/print/search-results"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/151 Safari/537.36"
ROOT = Path("public-media-analysis")
OUT = ROOT / "target-page-pairs"
OUT.mkdir(parents=True, exist_ok=True)

ANCHORS = {
    "Page 103": ["watch", "drone"],
    "Page 110": ["engine", "road"],
    "Page 241": ["chair", "force", "glow"],
}

lock = threading.Lock()
completed = [0]


def request_results(query: str, page_number: int) -> dict:
    params = {
        "asin": ASIN,
        "buyingAsin": ASIN,
        "query": query,
        "pageNumber": page_number,
        "pageSize": 100,
    }
    url = ENDPOINT + "?" + urllib.parse.urlencode(params)
    request = urllib.request.Request(
        url,
        headers={
            "Accept": "application/json",
            "User-Agent": UA,
            "Referer": f"https://read.amazon.com/kp/card?asin={ASIN}&preview=inline&linkCode=kpe",
        },
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        return json.loads(response.read())


def target_hit(query: str, target_label: str) -> tuple[bool, list[list[object]], str | None]:
    entries: list[list[object]] = []
    last_error = None
    for page_number in range(1, 4):
        body = None
        for attempt in range(5):
            try:
                body = request_results(query, page_number)
                break
            except Exception as exc:  # noqa: BLE001
                last_error = repr(exc)
                if attempt < 4:
                    time.sleep(0.35 * (2**attempt) + random.random() * 0.25)
        if body is None:
            break
        results = body.get("results") or []
        for entry in results:
            if isinstance(entry, list) and target_label in {str(item) for item in entry}:
                entries.append(entry)
        total = int(body.get("totalResults") or 0)
        if page_number * 100 >= total or not results:
            break
    return bool(entries), entries, last_error if not entries else None


def scan_task(task: tuple[str, str, str, str]) -> dict:
    target_label, anchor, candidate, direction = task
    if direction == "after":
        query = f"{anchor} {candidate}"
    else:
        query = f"{candidate} {anchor}"
    hit, entries, error = target_hit(query, target_label)
    with lock:
        completed[0] += 1
        if completed[0] % 100 == 0:
            print(f"completed {completed[0]}", flush=True)
    return {
        "target": target_label,
        "anchor": anchor,
        "candidate": candidate,
        "direction": direction,
        "query": query,
        "hit": hit,
        "entries": entries,
        "error": error,
    }


def main() -> None:
    source = json.loads((ROOT / "bip39-target-pages" / "target-words.json").read_text())
    candidates_by_page = {
        page: [item["word"] for item in items]
        for page, items in source["byPage"].items()
    }

    tasks: list[tuple[str, str, str, str]] = []
    for target_label, anchors in ANCHORS.items():
        for anchor in anchors:
            for candidate in candidates_by_page[target_label]:
                if candidate == anchor:
                    continue
                tasks.append((target_label, anchor, candidate, "before"))
                tasks.append((target_label, anchor, candidate, "after"))

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        rows = list(executor.map(scan_task, tasks))

    grouped: dict[str, dict[str, dict[str, list[dict]]]] = {}
    for target_label, anchors in ANCHORS.items():
        grouped[target_label] = {}
        for anchor in anchors:
            grouped[target_label][anchor] = {"before": [], "after": []}

    for row in rows:
        if row["hit"]:
            grouped[row["target"]][row["anchor"]][row["direction"]].append(row)

    for target_value in grouped.values():
        for anchor_value in target_value.values():
            for direction in ("before", "after"):
                anchor_value[direction].sort(key=lambda row: row["candidate"])

    result = {
        "runId": "${{ github.run_id }}",
        "queryCount": len(rows),
        "hitCount": sum(1 for row in rows if row["hit"]),
        "grouped": grouped,
        "errors": [row for row in rows if row["error"]],
    }
    (OUT / "pair-results.json").write_text(
        json.dumps(result, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    lines = [
        "# Hunting Time anchor-to-BIP39 ordered proximity",
        "",
        f"- Queries: {len(rows)}",
        f"- Page hits: {result['hitCount']}",
        f"- Errors: {len(result['errors'])}",
        "",
    ]
    for target_label, anchor_map in grouped.items():
        lines.extend([f"## {target_label}", ""])
        for anchor, direction_map in anchor_map.items():
            lines.extend([f"### `{anchor}`", ""])
            before = [row["candidate"] for row in direction_map["before"]]
            after = [row["candidate"] for row in direction_map["after"]]
            lines.append("Before anchor: " + (", ".join(f"`{item}`" for item in before) or "_none_"))
            lines.append("")
            lines.append("After anchor: " + (", ".join(f"`{item}`" for item in after) or "_none_"))
            lines.append("")

    (OUT / "pair-results.md").write_text("\n".join(lines), encoding="utf-8")
    print((OUT / "pair-results.md").read_text())


if __name__ == "__main__":
    main()
