# Placeholder visuals

**These are copied from musal.ai and show the Musal product, not Basiq's.** They are here
so the homepage layout can be judged with real content in the visual slots, and every one of
them needs replacing before this page carries weight with a visitor.

They are same-origin static HTML rendered in `<iframe>`s by `src/pages/index.astro`. Two
scripts in that page size them: `.mock-frame` scales a fixed-width mock down to its column,
and `iframe.fluid-frame` measures the mock's real height and grows the frame to fit.

## What each slot needs

| File | Used for | Should eventually show |
|---|---|---|
| `prompt-editor.html` | Hero | A Basiq-built system running in production |
| `problem-load-bearing.html` | Problem 1 | A pilot that stalled before production |
| `problem-tab-chaos.html` | Problem 2 | A deck-shaped deliverable with no running system |
| `problem-tea-leaves.html` | Problem 3 | An engineering team with no room for an AI side quest |
| `prompty-wizard-results.html` | Step 01, free assessment | The assessment output: ranked opportunities |
| `prompty-workbench-hero.html` | Step 02, build together | Work in progress alongside the client's team |
| `version-history.html` | Step 03, you own it | The handoff: repo, docs, and access transferred |
| `role-founder.html` | Founders persona tab | Whatever a founder recognizes as their problem |
| `role-revops.html` | Revenue leaders persona tab | Whatever a CRO recognizes as their problem |

`role-senior-pm.html`, `role-engineering-leaders.html`, and `role-gtm-engineer.html` are
unused today and are kept only as spare layouts if more personas get added.

To replace one, write a self-contained HTML file at the same path with a `.stage` wrapper as
its root element; the auto-height script measures that element. Keep to the Deep Forest
tokens in `src/styles/global.css`.

## Qindle product visuals (not placeholders)

`qindle-focus.html`, `qindle-deals.html`, and `qindle-customers.html` are the real thing:
Qindle's own screens redrawn in the Deep Forest palette. They render on
`/products/qindle`, which carries its own scaling script (the homepage one does not reach
them).

Three rules hold for all three:

- **Native width is 1060px** (`.stage` padding plus a 1000px frame). The page scales that
  down and measures the `.stage` height at runtime, so a mock can grow or shrink without a
  matching edit in `qindle.astro`.
- **Every account and person is invented**, and the one place a real-looking name is needed
  it is blurred via `.redact`. The product shows a rep's live book of business; none of it
  can go on a public page. Each mock carries a "Sample data" stamp for the same reason.
- **They move.** Cards stagger in, a counter ticks down, a task checks itself off, an upsell
  chip flips from unchecked to raised. All CSS keyframes, no script, so the loop keeps
  running wherever the file is opened.
