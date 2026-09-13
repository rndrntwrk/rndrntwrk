from __future__ import annotations

import csv
import json
import os
from pathlib import Path

from satori_wall.bulkdir import build_manifest_from_directories
from satori_wall.fetch import sha256_file
from satori_wall.layout import build_placements
from satori_wall.qa import render_contact_sheet, write_qa_report
from satori_wall.render import render_derivative, render_wall
from satori_wall.validate import validate_manifest

META_CID = os.environ.get(
    "SATORI_METADATA_CID",
    "bafybeiar7x3upqmim5m7alzlg6l5wvu2kpfytd3qtymhqfeiqrutficxku",
)
ART_CID = os.environ.get(
    "SATORI_ARTWORK_CID",
    "bafybeigx7527j3bzrpnc4mhvhrjvlhsnfriinx276cklxiu3ldm4ees3eu",
)
START_TOKEN = int(os.environ.get("SATORI_START_TOKEN", "1"))
EXPECTED_COUNT = int(os.environ.get("SATORI_EXPECTED_COUNT", "3333"))
END_TOKEN = int(os.environ.get("SATORI_END_TOKEN", str(START_TOKEN + EXPECTED_COUNT - 1)))
COLUMNS = int(os.environ.get("SATORI_COLUMNS", "57"))
ROWS = int(os.environ.get("SATORI_ROWS", "59"))
MASTER_WIDTH = int(os.environ.get("SATORI_MASTER_WIDTH", "11400"))
MASTER_HEIGHT = int(os.environ.get("SATORI_MASTER_HEIGHT", "11800"))
METADATA_ROOT = Path(os.environ.get("METADATA_DIR", "bulk/metadata"))
ARTWORK_ROOT = Path(os.environ.get("ARTWORK_DIR", "bulk/artwork"))
OUTPUT_ROOT = Path(os.environ.get("ARTIFACT_ROOT", "artifacts"))


def write_json(path: Path, payload: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def write_manifest_csv(path: Path, entries: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = list(entries[0]) if entries else []
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        if fieldnames:
            writer.writeheader()
            writer.writerows(entries)


def main() -> int:
    token_ids = list(range(START_TOKEN, END_TOKEN + 1))
    if len(token_ids) != EXPECTED_COUNT:
        raise RuntimeError(
            f"token range has {len(token_ids)} IDs; expected {EXPECTED_COUNT}"
        )
    if COLUMNS * ROWS < EXPECTED_COUNT:
        raise RuntimeError("grid has fewer cells than expected tokens")

    placements, empty_cells = build_placements(
        token_ids,
        columns=COLUMNS,
        rows=ROWS,
    )
    entries = build_manifest_from_directories(
        token_ids,
        METADATA_ROOT,
        ARTWORK_ROOT,
        placements,
        metadata_cid=META_CID,
        artwork_cid=ART_CID,
    )

    manifest_records = [entry.to_dict() for entry in entries]
    manifest_json = OUTPUT_ROOT / "manifest" / "satori-3333-manifest.json"
    manifest_csv = OUTPUT_ROOT / "manifest" / "satori-3333-manifest.csv"
    placement_json = OUTPUT_ROOT / "manifest" / "placement-map.json"
    source_config = OUTPUT_ROOT / "manifest" / "source-config.json"
    validation_json = OUTPUT_ROOT / "qa" / "validation.json"
    qa_report = OUTPUT_ROOT / "qa" / "QA-REPORT.md"
    contact_sheet = OUTPUT_ROOT / "qa" / "contact-sheet.jpg"
    render_dir = OUTPUT_ROOT / "renders"
    master_path = render_dir / "satori-3333-wall.png"

    write_json(manifest_json, manifest_records)
    write_manifest_csv(manifest_csv, manifest_records)
    write_json(
        placement_json,
        {
            "columns": COLUMNS,
            "rows": ROWS,
            "occupied_count": len(placements),
            "empty_cells": empty_cells,
            "placements": [placement.to_dict() for placement in placements],
        },
    )
    write_json(
        source_config,
        {
            "metadata_cid": META_CID,
            "artwork_cid": ART_CID,
            "start_token": START_TOKEN,
            "end_token": END_TOKEN,
            "expected_count": EXPECTED_COUNT,
            "columns": COLUMNS,
            "rows": ROWS,
            "master_dimensions": [MASTER_WIDTH, MASTER_HEIGHT],
            "metadata_root": str(METADATA_ROOT),
            "artwork_root": str(ARTWORK_ROOT),
            "source_policy": "exact canonical originals only; no substitution or generation",
        },
    )

    preflight = validate_manifest(
        entries,
        placements,
        empty_cells,
        expected_count=EXPECTED_COUNT,
    )
    write_json(validation_json, preflight.to_dict())
    manifest_sha = sha256_file(manifest_json)
    if not preflight.release_ready:
        resolved = [entry for entry in entries if entry.retrieval_status == "resolved"]
        samples = (
            render_contact_sheet(resolved, ARTWORK_ROOT, contact_sheet)
            if resolved
            else []
        )
        write_qa_report(
            qa_report,
            preflight,
            samples,
            manifest_sha256=manifest_sha,
        )
        raise RuntimeError(
            "canonical source gate failed: " + ", ".join(preflight.blocking_failures)
        )

    render_wall(
        entries,
        placements,
        empty_cells,
        ARTWORK_ROOT,
        master_path,
        size=(MASTER_WIDTH, MASTER_HEIGHT),
        columns=COLUMNS,
        rows=ROWS,
    )

    final_report = validate_manifest(
        entries,
        placements,
        empty_cells,
        expected_count=EXPECTED_COUNT,
        render_path=master_path,
        expected_render_size=(MASTER_WIDTH, MASTER_HEIGHT),
    )
    write_json(validation_json, final_report.to_dict())
    samples = render_contact_sheet(entries, ARTWORK_ROOT, contact_sheet)
    write_qa_report(
        qa_report,
        final_report,
        samples,
        manifest_sha256=manifest_sha,
    )

    derivative_specs = (
        ("satori-3333-wall-banner.jpg", (1500, 500), 171, "wall-banner-v1"),
        ("satori-3333-wall-16x9.jpg", (1920, 1080), 144, "wall-16x9-v1"),
        ("satori-3333-wall-4x5.jpg", (1350, 1688), 120, "wall-4x5-v1"),
        ("satori-3333-wall-square.jpg", (1080, 1080), 100, "wall-square-v1"),
    )
    for filename, size, requested_count, label in derivative_specs:
        render_derivative(
            entries,
            ARTWORK_ROOT,
            render_dir / filename,
            size=size,
            count=min(requested_count, len(entries)),
            seed_label=label,
            source_manifest_hash=manifest_sha,
        )

    write_json(
        OUTPUT_ROOT / "qa" / "release-summary.json",
        {
            "release_ready": final_report.release_ready,
            "manifest_sha256": manifest_sha,
            "master_sha256": sha256_file(master_path),
            "resolved_count": final_report.metrics["resolved_count"],
            "master_dimensions": [MASTER_WIDTH, MASTER_HEIGHT],
        },
    )

    if not final_report.release_ready:
        raise RuntimeError(
            "final canonical release gate failed: "
            + ", ".join(final_report.blocking_failures)
        )
    print(
        json.dumps(
            {
                "release_ready": True,
                "resolved_count": final_report.metrics["resolved_count"],
                "master": str(master_path),
                "manifest_sha256": manifest_sha,
            },
            indent=2,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
