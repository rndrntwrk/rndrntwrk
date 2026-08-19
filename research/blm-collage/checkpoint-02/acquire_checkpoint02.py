#!/usr/bin/env python3
from __future__ import annotations

import base64
import hashlib
import json
import os
import re
import shutil
import subprocess
import time
from pathlib import Path
from typing import Any
from urllib.parse import quote_plus

import requests

ROOT = Path("research/blm-collage/checkpoint-02-acquisition")
TARGET = "1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ"
UA = "BLM-Collage-Provenance-Audit/1.0 (+https://github.com/rndrntwrk/rndrntwrk)"
TOKEN = os.environ.get("GITHUB_TOKEN", "")
GH_HEADERS = {
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": UA,
}
if TOKEN:
    GH_HEADERS["Authorization"] = f"Bearer {TOKEN}"


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def safe_name(value: str) -> str:
    value = value.replace("..", "_")
    return re.sub(r"[^A-Za-z0-9._/-]+", "_", value).strip("/")


def write_response(name: str, response: requests.Response) -> dict[str, Any]:
    raw_dir = ROOT / "web"
    raw_dir.mkdir(parents=True, exist_ok=True)
    ext = ".json" if "json" in response.headers.get("content-type", "").lower() else ".html"
    path = raw_dir / f"{safe_name(name)}{ext}"
    path.write_bytes(response.content)
    record: dict[str, Any] = {
        "name": name,
        "url": response.url,
        "status": response.status_code,
        "content_type": response.headers.get("content-type", ""),
        "bytes": len(response.content),
        "sha256": sha256_file(path),
        "path": str(path),
    }
    try:
        record["json_top_type"] = type(response.json()).__name__
    except Exception:
        pass
    return record


def fetch_public_sources() -> list[dict[str, Any]]:
    urls = {
        "bitcointalk_all": "https://bitcointalk.org/index.php?topic=5404767.0;all",
        "reddit_original_json": "https://www.reddit.com/user/stsh_n/comments/j79zvj/bitcoin_puzzle_2000/.json?raw_json=1",
        "reddit_bitcoinpuzzles_json": "https://www.reddit.com/r/bitcoinpuzzles/comments/jrr7mo/is_this_puzzle_still_valid_is_this_image_correct/.json?raw_json=1",
        "reddit_cryptopuzzlers_json": "https://www.reddit.com/r/CryptoPuzzlers/comments/mbdogq/02_btc_puzzle/.json?raw_json=1",
        "pullpush_big_cut_comments": "https://api.pullpush.io/reddit/search/comment/?author=Big_Cut7029&size=100",
        "pullpush_straight_solution_comments": "https://api.pullpush.io/reddit/search/comment/?author=Straight-Solution-39&size=100",
        "pullpush_author_submissions": "https://api.pullpush.io/reddit/search/submission/?author=stsh_n&size=100",
        "pullpush_author_comments": "https://api.pullpush.io/reddit/search/comment/?author=stsh_n&size=100",
    }
    session = requests.Session()
    session.headers.update({"User-Agent": UA, "Accept": "*/*"})
    records: list[dict[str, Any]] = []
    for name, url in urls.items():
        try:
            response = session.get(url, timeout=60, allow_redirects=True)
            records.append(write_response(name, response))
        except Exception as exc:
            records.append({"name": name, "url": url, "error": repr(exc)})
    return records


def github_json(url: str, params: dict[str, Any] | None = None) -> Any:
    response = requests.get(url, headers=GH_HEADERS, params=params, timeout=60)
    response.raise_for_status()
    return response.json()


def fetch_code_search() -> dict[str, Any]:
    out = ROOT / "github-code-search"
    out.mkdir(parents=True, exist_ok=True)
    queries = [
        f'"{TARGET}"',
        '"0.2 BTC puzzle" bitcoin',
        '"Welcome to the Brave New World" bitcoin mnemonic',
    ]
    all_items: list[dict[str, Any]] = []
    seen = set()
    for qi, query in enumerate(queries, 1):
        try:
            data = github_json("https://api.github.com/search/code", {"q": query, "per_page": 100})
        except Exception as exc:
            (out / f"query-{qi:02d}-error.txt").write_text(repr(exc))
            continue
        (out / f"query-{qi:02d}.json").write_text(json.dumps(data, indent=2), encoding="utf-8")
        for item in data.get("items", []):
            key = (item.get("repository", {}).get("full_name"), item.get("path"), item.get("sha"))
            if key in seen:
                continue
            seen.add(key)
            all_items.append(item)

    records: list[dict[str, Any]] = []
    files_dir = out / "files"
    files_dir.mkdir(exist_ok=True)
    for i, item in enumerate(all_items):
        repo = item["repository"]["full_name"]
        path = item["path"]
        ref = item.get("sha")
        record: dict[str, Any] = {"repo": repo, "path": path, "blob_sha": ref, "html_url": item.get("html_url")}
        try:
            content = github_json(item["url"])
            encoded = content.get("content", "")
            raw = base64.b64decode(encoded) if encoded else b""
            dest = files_dir / safe_name(repo) / safe_name(path)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(raw)
            record.update({"bytes": len(raw), "sha256": sha256_file(dest), "saved_path": str(dest)})
        except Exception as exc:
            record["error"] = repr(exc)
        records.append(record)
    summary = {"queries": queries, "unique_items": len(records), "records": records}
    (out / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    return summary


def run(cmd: list[str], cwd: Path | None = None) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, cwd=cwd, text=True, capture_output=True, check=True)


def sparse_clone(repo: str, ref: str, paths: list[str]) -> dict[str, Any]:
    clone_root = ROOT / "repositories"
    clone_root.mkdir(parents=True, exist_ok=True)
    dest = clone_root / safe_name(repo)
    if dest.exists():
        shutil.rmtree(dest)
    url = f"https://github.com/{repo}.git"
    record: dict[str, Any] = {"repo": repo, "ref": ref, "paths": paths, "dest": str(dest)}
    try:
        run(["git", "clone", "--depth", "1", "--filter=blob:none", "--sparse", "--branch", ref, url, str(dest)])
        if paths:
            run(["git", "sparse-checkout", "set", "--no-cone", *paths], cwd=dest)
        record["head"] = run(["git", "rev-parse", "HEAD"], cwd=dest).stdout.strip()
        record["commit"] = json.loads(run(["git", "show", "-s", "--format={\"hash\":\"%H\",\"author_date\":\"%aI\",\"commit_date\":\"%cI\",\"subject\":\"%s\"}", "HEAD"], cwd=dest).stdout)
        # Preserve tracked file inventory and hashes, but remove .git to shrink the artifact.
        files = []
        for path in sorted(p for p in dest.rglob("*") if p.is_file() and ".git" not in p.parts):
            files.append({"path": str(path.relative_to(dest)), "bytes": path.stat().st_size, "sha256": sha256_file(path)})
        record["file_count"] = len(files)
        record["files"] = files
        shutil.rmtree(dest / ".git", ignore_errors=True)
    except Exception as exc:
        record["error"] = repr(exc)
    return record


def clone_known_repositories() -> list[dict[str, Any]]:
    specs = [
        ("floflo777/open-crypto-puzzles", "main", ["1-big-prizes/blm-brave-new-world-0-2btc", "puzzles.json"]),
        ("jmr2704/bitcoin-0.2-image-puzzle", "master", ["README.md", "images"]),
        ("HomelessPhD/BLM_0.2BTC", "main", ["README.md", "python_script", ".github"]),
        ("panchpasha/0.2-BTC-Puzzle-script", "main", ["README.md", "0.2-BTC-Puzzle-script"]),
        ("svenpohl/checkseedwordpermutations", "master", ["README.md", "checkpermutations.py"]),
        ("angwin7/btc-puzzle-0.2", "main", ["README.md", "0.2-BTC-Puzzle-script"]),
        ("lerasah/btc-puzzle-solver", "main", ["README.md", "CLAUDE.md"]),
        ("AmirHaz220/puzzle", "main", ["README.md"]),
        ("AlberTajuelo/bitcoin-0.2-image-puzzle", "master", ["README.md"]),
    ]
    records = [sparse_clone(*spec) for spec in specs]
    (ROOT / "repository-clones.json").write_text(json.dumps(records, indent=2), encoding="utf-8")
    return records


def build_manifest() -> dict[str, Any]:
    records = []
    for path in sorted(p for p in ROOT.rglob("*") if p.is_file()):
        records.append({"path": str(path.relative_to(ROOT)), "bytes": path.stat().st_size, "sha256": sha256_file(path)})
    manifest = {"generated_at_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), "file_count": len(records), "files": records}
    (ROOT / "MANIFEST.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    return manifest


def main() -> None:
    if ROOT.exists():
        shutil.rmtree(ROOT)
    ROOT.mkdir(parents=True)
    results = {
        "target": TARGET,
        "public_sources": fetch_public_sources(),
        "code_search": fetch_code_search(),
        "repositories": clone_known_repositories(),
    }
    (ROOT / "acquisition-summary.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    build_manifest()
    print(json.dumps({"target": TARGET, "root": str(ROOT), "repo_count": len(results["repositories"]), "code_search_items": results["code_search"]["unique_items"], "public_source_count": len(results["public_sources"])}, indent=2))


if __name__ == "__main__":
    main()
