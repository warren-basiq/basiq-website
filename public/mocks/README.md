# Homepage and product visuals

The `qindle-*.html` files are real Basiq product screens (see the section at the bottom).
**Everything else is copied from musal.ai and shows the Musal product, not Basiq's.** Those
are here so the homepage layout can be judged with real content in the visual slots, and
each still needs replacing before the page carries weight with a visitor.

They are same-origin static HTML rendered in `<iframe>`s by `src/pages/index.astro`. Two
scripts in that page size them: `.mock-frame` scales a fixed-width mock down to its column,
and `iframe.fluid-frame` measures the mock's real height and grows the frame to fit.

## What each slot needs

| File | Used for | Should eventually show |
|---|---|---|
| `qindle-focus.html` | Hero | **Done.** Qindle's ranked day |
| `problem-tab-chaos.html` | Problem 1 | A rep reconstructing context across five tools |
| `problem-tea-leaves.html` | Problem 2 | A pipeline review argued from data nobody believes |
| `problem-load-bearing.html` | Problem 3 | Deal context dropped at the handoff between stages |
| `prompty-workbench-hero.html` | Step 01, the meeting becomes the record | A conversation turned into structured deal state |
| `qindle-deals.html` | Step 02, the day is served | **Done.** Deals with the next move on each |
| `version-history.html` | Step 03, the approve loop | Musal's own screen, so close enough to keep |
| `qindle-focus.html` | Founders persona tab | **Done.** The served day (same file as the hero) |
| `qindle-customers.html` | Revenue leaders persona tab | **Done.** Renewal risk read off the calls |

`prompt-editor.html`, `prompty-wizard-results.html`, `role-founder.html`, `role-revops.html`,
`role-senior-pm.html`, `role-engineering-leaders.html`, and `role-gtm-engineer.html` are
unused today and are kept only as spare layouts if more slots or personas get added.

To replace one, write a self-contained HTML file at the same path with a `.stage` wrapper as
its root element; the auto-height script measures that element. Keep to the Deep Forest
tokens in `src/styles/global.css`.

## Qindle product visuals (not placeholders)

`qindle-focus.html`, `qindle-deals.html`, and `qindle-customers.html` are the real thing:
Qindle's own screens redrawn in the Deep Forest palette. They render on `/products/qindle`,
which carries its own scaling script, and in three homepage slots (hero and both persona
panels).

Three rules hold for all three:

- **Native width is 1060px** (`.stage` padding plus a 1000px frame). Both pages scale that
  down and measure the `.stage` height at runtime, so a mock can grow or shrink without a
  matching edit to the `--mock-h` in the markup. The persona panels render them *fluid*
  instead, at whatever width the column is, which is what the single-column breakpoint in
  each file is for.
- **Every account and person is invented**, and the one place a real-looking name is needed
  it is blurred via `.redact`. The product shows a rep's live book of business; none of it
  can go on a public page. Each mock carries a "Sample data" stamp for the same reason.
- **They move.** Cards stagger in, a counter ticks down, a task checks itself off, an upsell
  chip flips from unchecked to raised. All CSS keyframes, no script, so the loop keeps
  running wherever the file is opened.
