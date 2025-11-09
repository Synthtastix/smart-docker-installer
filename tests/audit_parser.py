#!/usr/bin/env python3
# S.M.A.R.T Docker Installer — Audit Parser v2.3
# Reads the installer's JSON state/log files and produces CSV / Markdown / JSONL reports.
# Compatible with v2.3 fields (run_id, version, commit, started_at, finished_at, duration_ms,
# targets[].name/type/mode/status/changed/rollback/errors[], host info, zero_destruction, etc.)
#
# Usage examples:
#   python3 audit_parser.py --input ./.state/last_run.json --out ./reports/audit.csv
#   python3 audit_parser.py --glob './state/run_*.json' --format md --out ./reports/audit.md
#   python3 audit_parser.py --glob './state/run_*.json' --format jsonl --out ./reports/audit.jsonl
#
# Exit codes: 0 OK, 2 Input missing/invalid, 3 Write error.
import sys, json, csv, argparse, pathlib, glob, datetime

FIELDS_V23 = [
    "run_id","version","commit","operator","hostname","ip",
    "started_at","finished_at","duration_ms","zero_destruction",
    "target","target_type","mode","status","changed","rollback","errors_count","errors"
]

def _read_json(path: pathlib.Path):
    try:
        with path.open("r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[ERR] Failed to read JSON: {path} :: {e}", file=sys.stderr)
        return None

def _coerce_row(doc: dict, tgt: dict) -> dict:
    # Map flexible schema to flat row
    return {
        "run_id": doc.get("run_id",""),
        "version": doc.get("version",""),
        "commit": doc.get("commit",""),
        "operator": doc.get("operator",""),
        "hostname": doc.get("hostname",""),
        "ip": doc.get("ip",""),
        "started_at": doc.get("started_at",""),
        "finished_at": doc.get("finished_at",""),
        "duration_ms": doc.get("duration_ms", tgt.get("duration_ms","")),
        "zero_destruction": doc.get("zero_destruction", True),
        "target": tgt.get("name",""),
        "target_type": tgt.get("type",""),
        "mode": tgt.get("mode",""),
        "status": tgt.get("status",""),
        "changed": tgt.get("changed_resources", tgt.get("changed", "")),
        "rollback": tgt.get("rollback", False),
        "errors_count": len(tgt.get("errors", []) or []),
        "errors": ";".join(map(str, tgt.get("errors", []) or [])),
    }

def _iter_docs(inputs):
    for p in inputs:
        data = _read_json(p)
        if not data:
            continue
        targets = data.get("targets") or []
        if not isinstance(targets, list):
            targets = []
        if not targets:
            # still emit one row for header-level metadata
            yield _coerce_row(data, {})
        else:
            for t in targets:
                yield _coerce_row(data, t)

def main():
    ap = argparse.ArgumentParser(description="S.M.A.R.T v2.3 Audit Parser")
    ap.add_argument("--input","-i", help="Single JSON file (e.g., ./.state/last_run.json)")
    ap.add_argument("--glob", help="Glob for multiple JSON files (e.g., './state/run_*.json')")
    ap.add_argument("--format","-f", choices=["csv","md","jsonl"], default="csv")
    ap.add_argument("--out","-o", default="./reports/audit.csv")
    ap.add_argument("--fields", nargs="*", default=FIELDS_V23, help="Override output columns.")
    args = ap.parse_args()

    paths = []
    if args.input:
        p = Path(args.input)
        if not p.exists():
            print(f"[ERR] File not found: {p}", file=sys.stderr); sys.exit(2)
        paths.append(p)
    if args.glob:
        import glob as _glob
        for g in _glob.glob(args.glob):
            p = Path(g)
            if p.exists():
                paths.append(p)
    if not paths:
        print("[ERR] No input files. Use --input or --glob.", file=sys.stderr); sys.exit(2)

    rows = list(_iter_docs(paths))
    outp = Path(args.out)
    outp.parent.mkdir(parents=True, exist_ok=True)

    try:
        if args.format == "csv":
            with outp.open("w", newline="", encoding="utf-8") as f:
                w = csv.DictWriter(f, fieldnames=args.fields)
                w.writeheader()
                for r in rows:
                    w.writerow({k: r.get(k,"") for k in args.fields})
        elif args.format == "md":
            with outp.open("w", encoding="utf-8") as f:
                import datetime as _dt
                f.write(f"# Audit Report (v2.3)\n\nGenerated: {_dt.datetime.utcnow().isoformat()}Z\n\n")
                header = "| " + " | ".join(args.fields) + " |"
                sep = "| " + " | ".join(["---"]*len(args.fields)) + " |"
                f.write(header + "\n" + sep + "\n")
                for r in rows:
                    f.write("| " + " | ".join(str(r.get(k,"")).replace('\n',' ').replace('|','\\|') for k in args.fields) + " |\n")
        else:  # jsonl
            with outp.open("w", encoding="utf-8") as f:
                for r in rows:
                    f.write(json.dumps(r, ensure_ascii=False) + "\n")
    except Exception as e:
        print(f"[ERR] Failed to write output: {outp} :: {e}", file=sys.stderr); sys.exit(3)

    print(f"[OK] Report written: {outp} ({args.format}, {len(rows)} rows)")

if __name__ == "__main__":
    main()
