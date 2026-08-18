---
name: kalibrate-context
description: Pull the Basiq positioning, persona, and sequence-brief context documents from Kalibrate before writing or changing any website copy, and publish new versions back when they change. Use whenever work touches page copy, headlines, meta descriptions, persona pages, product positioning, or proof points, and whenever a new context document is added.
---

# Kalibrate context for the Basiq website

Basiq's positioning and buyer research live in **Kalibrate**, not in this repo. Kalibrate is
the source of truth. `context/*.md` is a local mirror so page work can read the material
without a network round trip, and `.claude/skills/kalibrate-context/context-map.json` records
which document backs which part of the site.

**Never write positioning or persona copy from memory or from the existing pages.** The pages
were written before this material existed and some of them still reflect the older
portfolio-era story.

## Setup

`KALIBRATE_API_TOKEN` lives in `.env` (gitignored). Everything below assumes it is exported:

```
set -a && source .env && set +a
```

The helper is `.claude/skills/kalibrate-context/kalibrate.py`, run from the repo root.

## Before writing website copy

1. `./.claude/skills/kalibrate-context/kalibrate.py pull` — refresh the whole mirror. Cheap,
   and it is the only way to know the mirror is not stale.
2. Read `context-map.json` and open **only the documents that cover the surface you are
   changing**. The map's `use_for` field says what each one is good for.
   - Any page's core claims, hero, or meta description → `context/basiq-positioning.md`
   - A persona page → that persona's `persona` doc for pains and vocabulary, plus its
     `persona_brief` for triggers and proof points
   - Any customer result, metric, or logo → pull `proof_points_ws1_topiq` directly
     (`kalibrate.py` does not mirror it): `GET /api/v1/contexts/proof_points_ws1_topiq`
3. Write the copy from that material.

### Rules that override the source documents

- **Strip em dashes.** The Kalibrate documents are full of them. `src/` must contain none, and
  `npm run check:copy` fails the build over one. Rewrite the sentence per the copy rules in
  `CLAUDE.md`; do not swap the glyph.
- **Respect each brief's reserved word.** Every sequence brief claims one frame (Proof for the
  founder/CEO, Predictability for the CRO, Attainment for VP Sales, Control for RevOps) and
  explicitly rejects the others. Two persona pages must not argue the same angle.
- **The positioning doc is a hypothesis.** It says so at the top: one paying customer, roughly
  six trial users, revisit after 10 to 15 real sales cycles. Do not turn its directional proof
  points into hard numbers or a stats band. `ProductPage` takes `stats` as optional for exactly
  this reason.
- Deep Forest design and copy rules in `CLAUDE.md` win over anything in a context document.
  The `voice_ws1_user1` context is Warren's personal writing voice for outbound, **not** the
  site voice.

## When a context document changes

Edit the file in `context/`, then publish a new version. Never edit the mirror without pushing,
and never push without a note: the note is what makes the version history readable later.

```
./.claude/skills/kalibrate-context/kalibrate.py push context/basiq-positioning.md \
  --note "Sharpened the segment after the first five sales cycles."
```

`push` verifies by reading the published body back, and fails loudly on a mismatch. It also
handles the founder/CEO twin automatically (see below).

If page copy and a context document disagree, **fix the document first, then the page.** A page
that contradicts Kalibrate silently re-teaches the wrong story to the next agent.

## Adding a new context document

1. Write the markdown into `context/`.
2. Pick a slug: `{type}_ws1_{subject}`, lowercase, underscores, 60 chars max. Confirm it is free
   with `GET /api/v1/contexts/{slug}` (a 404 means available).
3. Create it, then add the `type` if it does not exist yet:
   ```
   POST /api/v1/contexts/types  {"name","slug","description"}
   POST /api/v1/contexts        {"name","slug","type_slug"}
   ```
4. Add an entry to `context-map.json` with `file`, `slug`, `type`, `covers`, and `use_for`.
   The map is what makes the document discoverable; a document not in the map will not be read.
5. Publish it with `kalibrate.py push`.

## Write mechanics

Publishing is always **two calls**, not one. There is no endpoint that creates a version
directly, and `POST .../versions` returns 404.

```
PUT  /api/v1/contexts/{slug}          {"draft_body": "...", "draft_source": "manual"}
POST /api/v1/contexts/{slug}/publish  {"note": "..."}     -> {"data": {"version": N}}
```

The version number increments on publish; you never set it. Publishing an empty draft returns
`400 Cannot publish an empty document`. `DELETE /api/v1/contexts/{slug}` removes a document and
its versions permanently, so treat it as destructive and confirm before using it.

Full API reference, including the prompt-execution endpoints this skill does not use, is in
`kalibrate-api-reference.md` next to this file.

## The founder/CEO twin

`persona_ws1_founder` and `persona_ws1_chief_executive_officer` hold identical bodies, as do
`persona_brief_ws1_founder` and `persona_brief_ws1_chief_executive_officer`. One local file backs
each pair, declared as `also_publishes_to` in the map, and `kalibrate.py push` publishes both.
Do not update one slug by hand and leave the other behind.

## Slugs that look relevant and are not

- `persona_ws1_director_of_revenue_operations` holds a **GTM Engineer** doc despite its name.
- `persona_ws1_sales_director` is a separate older doc, not a VP Sales variant.
- Anything under `ws3_` or `ws4_` belongs to other workstreams (operations, logistics, HR) and
  has nothing to do with this site.

## Checking for drift

`./.claude/skills/kalibrate-context/kalibrate.py diff` compares every mirrored file against its
published body. Run it if the copy on a page and the copy in `context/` seem to disagree, or
before starting a large copy change.
