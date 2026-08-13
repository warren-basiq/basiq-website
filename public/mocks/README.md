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
