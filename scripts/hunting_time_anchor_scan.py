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
OUT = Path("public-media-analysis/target-page-anchors")
OUT.mkdir(parents=True, exist_ok=True)

TARGETS = {
    "Page 103": {
        "internal": "112",
        "anchors": [
            "watch", "time", "wrist", "hand", "rain", "jungle", "forest",
            "soldier", "patrol", "team", "follow", "trail", "night", "clock",
            "hour", "wait", "drone", "uav", "thermal", "track", "tracking",
            "target", "signal", "coordinate", "coordinates", "latitude",
            "longitude", "altitude", "screen", "heat", "view", "surveillance",
            "locate", "location",
        ],
    },
    "Page 110": {
        "internal": "119",
        "anchors": [
            "land rover", "rover", "defender", "vehicle", "car", "truck",
            "jungle", "forest", "mud", "road", "trail", "engine", "wheel",
            "drive", "expedition", "off road", "offroad", "cargo", "rain",
            "headlight", "four wheel drive",
        ],
    },
    "Page 241": {
        "internal": "250",
        "anchors": [
            "cockpit", "helicopter", "pilot", "aircraft", "flight", "moon",
            "night", "jungle", "river", "instrument", "dashboard", "screen",
            "control", "radar", "crew", "military", "air force", "air", "force",
            "seat", "chair", "glow", "instrument panel",
        ],
    },
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


def scan_one(task: tuple[str, str]) -> dict:
    target_label, query = task
    last_error = None
    responses: list[dict] = []
    target_entries: list[list[object]] = []

    for page_number in range(1, 6):
        body = None
        for attempt in range(5):
            try:
                body = request_results(query, page_number)
                break
            except Exception as exc:  # noqa: BLE001
                last_error = repr(exc)
                if attempt < 4:
                    time.sleep(0.4 * (2**attempt) + random.random() * 0.3)
        if body is None:
            break

        results = body.get("results") or []
        responses.append(
            {
                "pageNumber": page_number,
                "totalResults": body.get("totalResults"),
                "resultCount": len(results),
            }
        )
        for entry in results:
            if isinstance(entry, list) and target_label in {str(item) for item in entry}:
                target_entries.append(entry)

        total = int(body.get("totalResults") or 0)
        if page_number * 100 >= total or not results:
            break

    with lock:
        completed[0] += 1
        if completed[0] % 10 == 0:
            print(f"completed {completed[0]}", flush=True)

    return {
        "target": target_label,
        "internal": TARGETS[target_label]["internal"],
        "query": query,
        "hit": bool(target_entries),
        "entries": target_entries,
        "responses": responses,
        "error": last_error if not responses else None,
    }


def main() -> None:
    tasks = [
        (target_label, anchor)
        for target_label, config in TARGETS.items()
        for anchor in config["anchors"]
    ]
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        rows = list(executor.map(scan_one, tasks))

    by_target: dict[str, list[dict]] = {label: [] for label in TARGETS}
    for row in rows:
        by_target[row["target"]].append(row)
    for values in by_target.values():
        values.sort(key=lambda row: row["query"])

    result = {
        "runId": "${{ github.run_id }}",
        "queryCount": len(rows),
        "hitCount": sum(1 for row in rows if row["hit"]),
        "byTarget": by_target,
    }
    (OUT / "anchor-results.json").write_text(
        json.dumps(result, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )

    lines = [
        "# Hunting Time target-page anchor scan",
        "",
        f"- Queries: {len(rows)}",
        f"- Target-page hits: {result['hitCount']}",
        "",
    ]
    for target_label, values in by_target.items():
        lines.extend([f"## {target_label}", ""])
        hits = [row for row in values if row["hit"]]
        misses = [row["query"] for row in values if not row["hit"]]
        if hits:
            for row in hits:
                lines.append(
                    f"- `{row['query']}` → `{json.dumps(row['entries'], ensure_ascii=False)}`"
                )
        else:
            lines.append("_No scene anchor hit._")
        lines.extend(["", "Misses: " + ", ".join(f"`{item}`" for item in misses), ""])

    (OUT / "anchor-results.md").write_text("\n".join(lines), encoding="utf-8")
    print((OUT / "anchor-results.md").read_text())


if __name__ == "__main__":
    main()
