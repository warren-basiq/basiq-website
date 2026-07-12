# Basiq Website Audit Tracker

This file tracks the audit status of every page on the Basiq Consulting website. Each section contains the extracted copy, review dates, and notes from each audit session.

---

## Audit Summary

| Page | Route | Source File(s) | Last Reviewed | Status |
|------|-------|---------------|---------------|--------|
| Homepage | `/` | `src/pages/index.astro`, `src/components/Homepage.tsx` | 2026-04-11 | Reviewed — 13 changes drafted |
| Engineering | `/engineering` | `src/pages/engineering.astro` | 2026-04-11 | Reviewed — 5 changes drafted |
| Business Applications | `/business-applications` | `src/pages/business-applications.astro` | 2026-04-11 | Reviewed — 4 changes drafted |
| Go-to-Market | `/go-to-market` | `src/pages/go-to-market.astro` | 2026-04-11 | Reviewed — 6 changes drafted |
| Operations | `/operations` | `src/pages/operations.astro` | 2026-04-11 | Reviewed — 5 changes drafted |
| AI Strategy | `/ai-strategy` | `src/pages/ai-strategy.astro` | 2026-04-11 | Reviewed — 4 changes drafted |
| Pricing | `/pricing` | ~~`src/pages/pricing.astro`~~ | 2026-04-23 | **Removed** — page deleted, nav link removed |
| Qenerate | `/qenerate` | ~~`src/pages/qenerate.astro`~~ | 2026-07-12 | **Renamed** — now Qindle at `/products/qindle`, 301 in place |
| Products (hub) | `/products` | `src/pages/products/index.astro` | 2026-07-12 | New — full product suite |
| Fabriq | `/products/fabriq` | `src/pages/products/fabriq.astro` | 2026-07-12 | New — copy from Topiq VP-CS persona page |
| Qindle | `/products/qindle` | `src/pages/products/qindle.astro` | 2026-07-12 | New — ported from Qenerate, now badged Live |
| LaneScout | `/products/lanescout` | `src/pages/products/lanescout.astro` | 2026-07-12 | New — Coming soon |
| Blog Index | `/blog` | `src/pages/blog/index.astro` | 2026-04-11 | CMS-managed, no static copy changes |

---

## Page Details

### Homepage (`/`)

**Source:** `src/pages/index.astro` (shell) → `src/components/Homepage.tsx` (all copy)

**Extracted Copy:**

- **Label:** AI Execution Partner
- **Hero H1:** Your AI pilot worked. Now nothing else has moved.
- **Hero subhead:** Basiq takes AI from proof of concept to production. We build and deploy the systems, and your team keeps running them after we're done.
- **CTAs:** "Book a Free Assessment" / "See Our Work"
- **Positioning statement:** Most AI engagements end with a strategy doc and a thank you. Ours end with tools your team uses on Monday. We work alongside your engineers, sales teams, and ops. And we leave when there's a working system in place, not before.
- **Services section ("Five ways we deploy AI"):**
  - Engineering — Faster PRs, better code, team-wide AI adoption.
  - Business Applications — Custom AI tools built for your workflows.
  - Go-to-Market — AI-assisted outreach, enablement, and pipeline.
  - Operations — Automation that actually runs without babysitting.
  - AI Strategy — Where to start, what to build, how to sequence it.
- **How it works ("Three steps. No mystery."):**
  - 01 Free Assessment (5-15 hours) — We map your highest-leverage AI opportunities and deliver working prototypes, not recommendations.
  - 02 Build Together (Weeks, not months) — We embed in your team and build the actual systems. Side by side with your engineers and operators.
  - 03 You Own It (Permanent handoff) — We document, train, and hand off. You keep the tools. No retainers. No dependency.
- **Testimonials:**
  - James Lawler, Director, TricoStar
  - Helen Lin, CEO, Discern
  - Greg LeNeveu, CRO, Knak
  - JB, CEO, Authentic
  - Ed Seymour, CEO, Vado
- **Products section ("Five products. Four already in production."), updated 2026-07-12:**
  - Topiq — AI sales inbox for outbound teams (Live, → gettopiq.ai)
  - Fabriq — Customer intelligence for CS leaders (Live, → /products/fabriq)
  - Musal — The prompt workshop for AI teams (Live, → musal.ai). Was Kalibrate.
  - Qindle — The prospecting CRM built for AEs (Live, → /products/qindle). Was Qenerate.
  - LaneScout — Negotiation coaching for carrier desks (Coming soon, → /products/lanescout)
  - All five now render from the `src/lib/products.ts` registry, which also drives the
    nav dropdown, the footer column, the `/products` hub, and llms-full.txt. The old dead
    `#` link on Kalibrate and the "More coming soon" placeholders are gone.
- **Footer CTA:** Not sure where to start? That's what the assessment is for.

**Last Reviewed:** 2026-04-10
**Review Notes:** Compared against all 3 personas (CEO/Founder, CTO, VP of Engineering) and the service offering doc. Key findings:

**CEO/Founder:** Hero line and positioning statement resonate strongly with the "nothing ships" and "consultants don't deliver results" pain points. Missing: investor narrative pressure (CEO needs a credible board story backed by real deployments), cross-functional coordination (Basiq acts as the AI owner the company doesn't have). No testimonial references the "strategy doc gathering dust" pain.

**CTO:** Hero line maps to "pilots stall between POC and production." Missing: product strategy and competitive positioning (where AI belongs in the product), board-ready AI strategy, recruiting/talent angle. Engineering service description uses VP-level language ("faster PRs") not CTO-level language ("production deployments, product differentiation").

**VP of Engineering:** "Build Together" and "You Own It" steps resonate. Missing: inconsistent/haphazard AI adoption across the team (the playbook problem), senior engineer resistance and change management, ROI measurement language to justify the engagement to leadership.

**Service offering alignment:** Homepage lists 5 services vs. 4 pillars in the doc. Business Applications, Operations, and GTM descriptions on homepage are significantly vaguer than the service offering language. Business Apps especially undersold ("Custom AI tools" vs. "process experts become builders").

**Other flags:** No CTO/VP Eng testimonial (3 of 5 are CEOs). Kalibrate has a dead `#` link. Bento grid may make services look like a pick-one menu vs. diagnostic-driven entry point.

**Action needed:** CRO and VP of Sales personas being added to knowledge base. Re-audit homepage against all 5 personas once complete.

---

### Engineering (`/engineering`)

**Source:** `src/pages/engineering.astro`

**Extracted Copy:**

- **Label:** Engineering
- **Hero H1:** Going from AI-curious to AI-native.
- **Hero subhead:** Most engineering teams are dabbling with AI using Co-Pilot. That's fine, but it's not a competitive advantage — it's table stakes. We build engineering organizations that run AI natively end-to-end.
- **CTA:** Book a Free Assessment
- **"What we build" — Three foundations of an AI-native engineering team:**
  - 01 Claude Code Integration — We get your team set up and actually using AI coding tools — not just installed, but integrated into daily workflows. From first commit to team-wide adoption.
  - 02 Custom Agents — We help you design and ship your first agents: tools that do real work autonomously so your engineers spend time on the hard stuff, not the repetitive stuff.
  - 03 AI Infrastructure — Getting the right architecture in place so your AI usage is secure, auditable, and scalable — not a patchwork of personal API keys.
- **Photo break result line:** An engineering team that ships faster, reviews smarter, and doesn't spend all of its time fixing bugs.
- **"The output" — What your engineering team looks like after:**
  - Ship faster — Faster PRs, better code: Code review, QA, and documentation get handed off to agents. Engineers focus on architecture and the problems that actually require human judgment.
  - Review smarter — AI-powered PR and audit: Every pull request gets an AI-first pass. Security review, style enforcement, and documentation happen automatically before a human ever looks at the code.
  - Scale without hiring — Don't hire for tasks AI handles: The repetitive work that used to require headcount — boilerplate, migrations, test generation, docs — gets absorbed by agents. Your team grows in capability, not cost.
- **CTA section:** Ready to go AI-native? / Every engagement starts with a diagnostic... / Book Your Free Assessment

**Last Reviewed:** _Not yet reviewed_
**Review Notes:** —

---

### Business Applications (`/business-applications`)

**Source:** `src/pages/business-applications.astro`

**Extracted Copy:**

- **Label:** Business Applications
- **Hero H1:** Turning process experts into builders.
- **Hero subhead:** Your biggest efficiency gains aren't in engineering. They're in every other department — finance, HR, ops, legal, sales — where people do repetitive, high-stakes work nobody has automated because it required an engineer. That's no longer true.
- **CTA:** Book a Free Assessment
- **"What we build" — Three ways we turn domain experts into app builders:**
  - 01 Embedded Engineering — We embed one or two engineers into each function of your business. They sit with the process expert — the person who actually does the work — and together they identify and build the applications that matter.
  - 02 AI-Powered App Building — The process expert leads, the engineer supervises, and Claude Code does the building. A finance analyst builds her own reconciliation tool. An HR manager ships his own onboarding workflow.
  - 03 Ownership Handoff — Every application is owned by the people who use it. No dependency on engineering backlogs, no tickets, no waiting. The team that needs the tool maintains the tool.
- **Photo break result line:** A library of internal applications built by the people who need them, owned by the people who use them.
- **"The output" — What your business teams look like after:**
  - Superpowered teams — Every department builds
  - Zero backlog — No more waiting on engineering
  - Compounding value — An internal app library that grows
- **CTA section:** Ready to unlock your team? / Book Your Free Assessment

**Last Reviewed:** _Not yet reviewed_
**Review Notes:** —

---

### Go-to-Market (`/go-to-market`)

**Source:** `src/pages/go-to-market.astro`

**Extracted Copy:**

- **Label:** Go-to-Market
- **Hero H1:** A GTM motion built on signal, not instinct.
- **Hero subhead:** Sales, CS, and marketing are sitting on a goldmine of data they're not using. Every call you're not recording is a missed opportunity. Every CRM field your reps aren't updating is a forecasting blind spot. We fix that across all three GTM functions.
- **CTA:** Book a Free Assessment
- **"What we build" — AI across every GTM function:**
  - 01 Sales — Automate prospecting, CRM updates, and outreach sequencing. Build forecasting tools that don't rely on gut feel. Surface deal risk before it becomes a lost deal. Reps should be selling, not logging.
  - 02 Customer Success — Record and transcribe every customer call. Build agents that analyze calls for risk signals: product complaints, champion changes, usage drops, competitive mentions. Surface them before they become problems.
  - 03 Marketing — Attach to your sales calls — that's your best market research. Identify messaging gaps, competitive intel, and customer language. Automate content generation grounded in real customer voice, not assumptions.
- **Photo break result line:** A GTM motion that runs on signal, not instinct. Every conversation becomes data. Every signal becomes action.
- **"The output" — What your GTM org looks like after:**
  - Pipeline velocity — Reps sell, AI handles the rest
  - Churn prevention — Risk surfaces before it's too late
  - Real customer voice — Marketing speaks the customer's language
- **CTA section:** Ready to run on signal? / Book Your Free Assessment

**Last Reviewed:** _Not yet reviewed_
**Review Notes:** —

---

### Operations (`/operations`)

**Source:** `src/pages/operations.astro`

**Extracted Copy:**

- **Label:** Operations
- **Hero H1:** AI as a default for every employee.
- **Hero subhead:** This is the hardest pillar to sell and the most important one to get right. The difference between companies that win with AI and companies that just spend money on AI licenses is adoption — real, habitual adoption across every function and every role.
- **CTA:** Book a Free Assessment
- **"What we build" — Three habits that make AI the default:**
  - 01 AI-First Writing & Thinking — Before anyone writes anything — an email, a memo, a proposal — they go to AI first. Stuck on a problem? Talk to Claude before calling a meeting. Not to copy-paste, but to think faster.
  - 02 Access to New Data Sets — Your teams are making decisions with the information they've always had. AI unlocks data they never had access to — industry research, competitive intelligence, customer signals, market trends.
  - 03 Conversational Intelligence — Every internal meeting, every customer call, every board review — recorded, transcribed, summarized, actioned. The work that used to happen after the meeting now happens automatically.
- **Photo break result line:** An organization that moves faster because every employee has a research assistant, a writing partner, and a thought partner.
- **"The output" — What your organization looks like after:**
  - Full adoption — AI is habitual, not optional
  - Better decisions — Decisions backed by data you never had
  - Zero wasted meetings — Every meeting produces output automatically
- **CTA section:** Ready to make AI the default? / Book Your Free Assessment

**Last Reviewed:** _Not yet reviewed_
**Review Notes:** —

---

### AI Strategy (`/ai-strategy`)

**Source:** `src/pages/ai-strategy.astro`

**Extracted Copy:**

- **Label:** AI Strategy
- **Hero H1:** Where to start, what to build, how to sequence it.
- **Hero subhead:** Most companies dabbling in AI are leaving 80% of the value on the table. They've got engineers using Copilot and a few people prompting ChatGPT. That's not an AI strategy — that's just expensive experimentation. We help you operationalize AI across your business. Now.
- **CTA:** Book a Free Assessment
- **"How we engage" — Three phases from assessment to AI-enabled:**
  - 01 Diagnostic — We map where you are today, identify your highest-leverage AI opportunities, and deliver working prototypes — not recommendations. The assessment is free and takes a few hours.
  - 02 Sequencing — We figure out which of our four pillars — Engineering, Business Apps, GTM, or Operations — is the right entry point for where you are. Then we sequence the rest.
  - 03 Embedded Execution — We work in focused sprints — embedding with your team, building real things, and getting to outcomes fast. We're here to build alongside you until you don't need us anymore.
- **Photo break result line:** A clear picture of where AI moves the needle for your business and a working system to prove it.
- **"The output" — What you walk away with:**
  - Clarity — A map, not a mystery
  - Proof — Working prototypes, not slide decks
  - Independence — You own everything we build
- **CTA section:** Not sure where to start? That's what the assessment is for. / Book Your Free Assessment

**Last Reviewed:** _Not yet reviewed_
**Review Notes:** —

---

### Pricing (`/pricing`)

**Source:** `src/pages/pricing.astro`

**Extracted Copy:**

- **H1:** Simple, transparent pricing
- **Subhead:** No hidden fees. Cancel anytime.
- **Plans:** Starter ($29/mo), Pro ($79/mo), Enterprise (Custom)

**Last Reviewed:** _Not yet reviewed_
**Review Notes:** **FLAG: This is a placeholder page with generic SaaS pricing that has nothing to do with Basiq's consulting model. Needs a full rewrite or removal.**

---

### Products hub (`/products`)

**Source:** `src/pages/products/index.astro` (copy from `src/lib/products.ts`)

**Extracted Copy:**

- **Label:** Products
- **Hero H1:** The Basiq product suite
- **Hero subhead:** We don't just build AI systems for clients — we ship them as products. Four in production, one on the way.
- **Body:** Five product rows (category, name, status badge, tagline, description, CTA), a positioning statement tying the products back to the consulting practice, and the standard Book-a-Free-Assessment CTA.
- **SEO:** title/description/canonical + OG + Twitter via `Layout.astro`. JSON-LD: `CollectionPage` with an `ItemList` of five `SoftwareApplication`s. No `offers` block — no rating source exists, and `offers` without `aggregateRating` gets flagged as invalid structured data.

**Last Reviewed:** 2026-07-12
**Review Notes:** New page. Single source of truth for all product surfaces is `src/lib/products.ts` — the homepage grid, nav dropdown, footer column, this hub, and llms-full.txt all read from it, so the drift that had the site advertising Kalibrate and Qenerate can't recur.

---

### Fabriq (`/products/fabriq`)

**Source:** `src/pages/products/fabriq.astro`

**Extracted Copy:**

- **Label:** Customer Success · Live
- **Hero H1:** You can't protect what you can't see.
- **Hero subhead:** AI-powered customer intelligence for CS leaders managing net retention at scale.
- **CTAs:** Get a Demo / All products
- **Problem ("Retention is decided in conversations you never hear"):** the visibility gap; coaching doesn't scale (10–30 CSMs × 20–30 conversations/week); forecasts built on optimism (off by 10–15%).
- **Features ("Every conversation, working for you"):** Customer Snapshot · Stakeholder Sentiment Tracking · Expansion Intelligence · Evidence-Based Renewal Forecasting (60–90 day early warning) · CSM Capacity at Scale · Sales-to-CS Handoff
- **CTA section:** Stop forecasting renewals on gut feel. / Get a Demo

**Last Reviewed:** 2026-07-12
**Review Notes:** Copy adapted from the Topiq VP-of-Customer-Success persona page (gettopiq.ai/vice-president-of-customer-success). **Open item:** that source page carries two stats rendered without denominators ("Of CS teams say they can't predict churn before it happens"). Omitted here until the real figures are confirmed — a stat with no number is worse than no stat.

---

### Qindle (`/products/qindle`)

**Source:** `src/pages/products/qindle.astro` (was `src/pages/qenerate.astro`)

**Extracted Copy:**

- **Label:** CRM · Live
- **Hero H1:** Qindle
- **Hero subhead:** The only prospecting CRM built for Account Executives to focus on account and prospect discovery — and the only human parts of pipe gen: cold calling and video.
- **CTAs:** Book a Demo / All products
- **Problem statement:** AEs spend too much time on admin and not enough on the two things that actually generate pipeline — cold calls and personalized video outreach. Qindle fixes that.
- **Features ("Built for AEs — Everything you need, nothing you don't"):** Account Discovery · Prospect Research · Cold Call Workflows · Video Outreach · AI-Powered Automation · Pipeline Focus
- **CTA section:** Built by AEs, for AEs. / Book a Demo

**Last Reviewed:** 2026-07-12
**Review Notes:** Renamed from Qenerate; body copy carried over. Status changed from "Coming soon" to **Live**, so the CTA moved from "Get Early Access" to "Book a Demo" pointing at the standard booking link. **Open item:** if Qindle has its own signup or app URL, the CTA should point there instead. `/qenerate` 301s here.

---

### LaneScout (`/products/lanescout`)

**Source:** `src/pages/products/lanescout.astro`

**Extracted Copy:**

- **Label:** Logistics · Coming soon
- **Hero H1:** Turn your carrier desk into a margin engine.
- **Hero subhead:** AI-powered negotiation coaching built specifically for US trucking brokers.
- **CTAs:** Get Early Access / All products
- **Problem:** CSRs come in with a number, the carrier pushes back, they split the difference. For a mid-size broker the gap vs. benchmark rates can exceed $200k/month.
- **How it works:** 01 Connects to your phone system · 02 AI analyzes every call · 03 One skill per week · 04 Real-time nudges after every call · 05 Scoring and manager visibility
- **Who benefits:** CSR Managers · Carrier Sales Reps
- **Comparison table:** Generic call analytics vs. LaneScout (5 rows)
- **Business case:** 500 loads/day × $2,000 → a 1% negotiation improvement is $10k/day (~$3.6M/yr)
- **CTA section:** Every call is a chance to protect your margin — or give it away. / Get Early Access

**Last Reviewed:** 2026-07-12
**Review Notes:** Built from `~/Documents1/knowledge_base/LaneScout/value-proposition.md`. The dollar figures are illustrative models from that doc, not customer results — keep them framed as scenarios, not claims. Six persona docs sit alongside the value prop in the knowledge base and haven't been mined yet; a persona-alignment pass is worth doing before launch.

---

### Blog (`/blog`)

**Source:** `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`

**Notes:** Blog content is managed through Sanity CMS. Individual post copy is not tracked here — only the blog index page structure and any static copy.

**Last Reviewed:** _Not yet reviewed_
**Review Notes:** —

---

## Knowledge Base Reference

**Personas available for comparison:**

| Persona | File | Primary Pages |
|---------|------|---------------|
| CEO / Founder | `ceo-founder.md` | Homepage, AI Strategy, Business Applications, Operations |
| CTO | `cto.md` | Homepage, Engineering, AI Strategy |
| VP of Engineering | `vp-of-engineering.md` | Homepage, Engineering |

**Service Offering:** `service-offering.md` — The Four Pillars (Engineering, Business Application Development, Go-to-Market, Operations)

**Note:** No GTM-specific personas (VP Sales, CRO, etc.) are currently documented. The Go-to-Market page should be compared against the service offering and the CEO/Founder persona until GTM personas are created.
