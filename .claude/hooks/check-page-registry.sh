#!/usr/bin/env bash
# PostToolUse hook: when a route page under src/pages/ is created or edited,
# check that its route exists in the site-pages registry (src/lib/site-pages.ts).
# If missing, nudge Claude to add it and run the llms-and-sitemap-maintainer
# agent so llms.txt / llms-full.txt / sitemap.xml stay in sync.
#
# Non-blocking: always exits 0. Surfaces a reminder via additionalContext.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
REGISTRY="$ROOT/src/lib/site-pages.ts"

# Read the hook payload (JSON) from stdin and pull the edited file path.
payload="$(cat)"
fp="$(printf '%s' "$payload" | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d.get("tool_input",{}).get("file_path",""))' 2>/dev/null || true)"

[ -z "$fp" ] && exit 0

# Only care about route pages: src/pages/**/*.astro
case "$fp" in
  *"/src/pages/"*.astro) ;;
  *) exit 0 ;;
esac

# Ignore dynamic routes, admin, and the dev-only injected pages.
case "$fp" in
  *"["*"]"*) exit 0 ;;            # [slug].astro etc.
  *"/src/pages/admin/"*) exit 0 ;;
esac

# Derive the route path from the file path.
rel="${fp#*/src/pages}"          # e.g. /learn/foo.astro, /index.astro
rel="${rel%.astro}"              # strip extension
rel="${rel%/index}"              # /learn/index -> /learn
[ -z "$rel" ] && rel="/"         # /index -> /

[ -f "$REGISTRY" ] || exit 0

# Already registered? Then nothing to do.
if grep -qF "path: \"$rel\"" "$REGISTRY"; then
  exit 0
fi

msg="Page route \"$rel\" ($fp) is not in the site-pages registry (src/lib/site-pages.ts). \
This drives llms.txt, llms-full.txt and sitemap.xml. Add an entry for it (section, title, \
description, and sitemap/llms flags — set sitemap:false if the page is noindex), then invoke \
the llms-and-sitemap-maintainer subagent to verify the generated files. See \
.claude/agents/llms-and-sitemap-maintainer.md."

# Emit as additionalContext so it reaches the model (PostToolUse, non-blocking).
python3 -c 'import json,sys;print(json.dumps({"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":sys.argv[1]}}))' "$msg"
exit 0
