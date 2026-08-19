from __future__ import annotations

import hashlib
import json
import urllib.parse
import urllib.request
from pathlib import Path

ASIN = "B0FRGB2PMR"
ENDPOINT = "https://read.amazon.com/sample/print/search-results"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/151 Safari/537.36"
TARGETS = [
    {"printed": 103, "internal": "112", "query": "watch"},
    {"printed": 110, "internal": "119", "query": "road"},
    {"printed": 241, "internal": "250", "query": "watch"},
]
OUT = Path("public-media-analysis/target-page-images")
OUT.mkdir(parents=True, exist_ok=True)


def request_json(query: str, cache: dict[str, dict]) -> dict:
    if query in cache:
        return cache[query]
    params = {
        "asin": ASIN,
        "buyingAsin": ASIN,
        "query": query,
        "pageNumber": 1,
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
        value = json.loads(response.read())
    cache[query] = value
    return value


def download(url: str, destination: Path) -> bytes:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": UA, "Referer": "https://read.amazon.com/"},
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        data = response.read()
    destination.write_bytes(data)
    return data


def find_entries(value: object, label: str) -> list[list[object]]:
    found: list[list[object]] = []
    if isinstance(value, list):
        if label in {str(item) for item in value}:
            found.append(value)
        for child in value:
            found.extend(find_entries(child, label))
    elif isinstance(value, dict):
        for child in value.values():
            found.extend(find_entries(child, label))
    return found


def main() -> None:
    cache: dict[str, dict] = {}
    results: list[dict] = []

    for target in TARGETS:
        response = request_json(target["query"], cache)
        label = f"Page {target['printed']}"
        entries = find_entries(response, label)
        urls = response.get("jumboImageUrls") or {}
        page_url = urls.get(target["internal"])
        result = {
            **target,
            "label": label,
            "entries": entries,
            "totalResults": response.get("totalResults"),
            "imageKeyCount": len(urls),
            "firstImageKeys": list(urls)[:25],
            "hasImageUrl": bool(page_url),
        }
        if page_url:
            image_path = OUT / f"page-{target['printed']:03d}.jpg"
            data = download(page_url, image_path)
            result.update(
                imageFile=image_path.name,
                imageBytes=len(data),
                sha256=hashlib.sha256(data).hexdigest(),
            )
        results.append(result)

    for query, response in cache.items():
        (OUT / f"query-{query}-response.json").write_text(
            json.dumps(response, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )

    (OUT / "retrieval-results.json").write_text(
        json.dumps(results, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    lines = ["# Hunting Time target-page retrieval", ""]
    for result in results:
        lines.extend(
            [
                f"## {result['label']}",
                "",
                f"- Query: `{result['query']}`",
                f"- Internal page: `{result['internal']}`",
                f"- Matching search entries: `{json.dumps(result['entries'], ensure_ascii=False)}`",
                f"- Image URL available: `{result['hasImageUrl']}`",
                f"- Image-key count: `{result['imageKeyCount']}`",
                f"- Image bytes: `{result.get('imageBytes')}`",
                f"- SHA-256: `{result.get('sha256')}`",
                "",
            ]
        )
    (OUT / "retrieval-results.md").write_text("\n".join(lines), encoding="utf-8")
    print((OUT / "retrieval-results.md").read_text())

    missing = [item["label"] for item in results if not item["hasImageUrl"]]
    if missing:
        raise SystemExit(f"Missing image URLs: {missing}")


if __name__ == "__main__":
    main()
