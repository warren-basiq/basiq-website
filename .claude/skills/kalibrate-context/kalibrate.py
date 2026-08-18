#!/usr/bin/env python3
"""Sync the WS1 Basiq context documents between context/*.md and Kalibrate.

Kalibrate is the source of truth. `pull` refreshes the local mirror, `push`
publishes a new version of a document that was edited locally. Run from the
repo root with KALIBRATE_API_TOKEN set (see .env).

    ./kalibrate.py list
    ./kalibrate.py pull [slug|file ...]     # default: every mapped document
    ./kalibrate.py push <file> --note "why this version exists"
    ./kalibrate.py diff                     # local mirror vs published bodies
"""
import argparse, json, os, pathlib, sys, urllib.error, urllib.request

BASE = os.environ.get("KALIBRATE_BASE_URL", "https://app.kalibrate.work")
ROOT = pathlib.Path(__file__).resolve().parents[3]
MAP = json.loads((pathlib.Path(__file__).parent / "context-map.json").read_text())


def token() -> str:
    t = os.environ.get("KALIBRATE_API_TOKEN")
    if not t:
        sys.exit("KALIBRATE_API_TOKEN is not set. It lives in .env (gitignored).")
    return t


def call(method: str, path: str, payload=None):
    req = urllib.request.Request(
        f"{BASE}{path}",
        data=json.dumps(payload).encode() if payload is not None else None,
        method=method,
        headers={"Authorization": f"Bearer {token()}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"Kalibrate {method} {path} failed: {e.code} {e.read().decode()[:400]}")


def resolve(refs):
    """Map CLI arguments (slugs or paths) onto context-map entries."""
    docs = MAP["documents"]
    if not refs:
        return docs
    out = []
    for ref in refs:
        name = pathlib.Path(ref).name
        hit = next((d for d in docs if d["slug"] == ref or pathlib.Path(d["file"]).name == name), None)
        if not hit:
            sys.exit(f"Not in context-map.json: {ref}")
        out.append(hit)
    return out


def cmd_list(_):
    for d in MAP["documents"]:
        live = call("GET", f"/api/v1/contexts/{d['slug']}")["data"]
        print(f"{d['slug']:56} v{live['version']:<3} {d['file']}")
        print(f"{'':56}      covers: {d['covers']}")


def cmd_pull(args):
    for d in resolve(args.refs):
        live = call("GET", f"/api/v1/contexts/{d['slug']}")["data"]
        path = ROOT / d["file"]
        changed = not path.exists() or path.read_text() != live["body"]
        path.write_text(live["body"])
        print(f"{'updated' if changed else 'current'}  {d['file']}  (v{live['version']})")


def cmd_push(args):
    d = resolve([args.file])[0]
    body = (ROOT / d["file"]).read_text()
    targets = [d["slug"]] + ([d["also_publishes_to"]] if "also_publishes_to" in d else [])
    for slug in targets:
        call("PUT", f"/api/v1/contexts/{slug}", {"draft_body": body, "draft_source": "manual"})
        v = call("POST", f"/api/v1/contexts/{slug}/publish", {"note": args.note})["data"]["version"]
        check = call("GET", f"/api/v1/contexts/{slug}")["data"]
        if check["body"] != body:
            sys.exit(f"Read-back mismatch on {slug}. Do not assume the publish landed.")
        print(f"published {slug} -> v{v}")


def cmd_diff(_):
    drift = 0
    for d in MAP["documents"]:
        live = call("GET", f"/api/v1/contexts/{d['slug']}")["data"]
        path = ROOT / d["file"]
        if not path.exists():
            print(f"MISSING  {d['file']}")
            drift += 1
        elif path.read_text() != live["body"]:
            print(f"DRIFTED  {d['file']}  (published v{live['version']})")
            drift += 1
    print(f"{drift} document(s) differ from Kalibrate." if drift else "Local mirror matches Kalibrate.")
    return drift


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("list").set_defaults(fn=cmd_list)
    pl = sub.add_parser("pull"); pl.add_argument("refs", nargs="*"); pl.set_defaults(fn=cmd_pull)
    ps = sub.add_parser("push"); ps.add_argument("file"); ps.add_argument("--note", required=True); ps.set_defaults(fn=cmd_push)
    sub.add_parser("diff").set_defaults(fn=cmd_diff)
    a = p.parse_args()
    sys.exit(a.fn(a) or 0)
