# Basiq Website Audit — Change Summary
**Date:** 2026-04-11
**Compared against:** CEO/Founder, CTO, VP of Engineering, CRO, VP of Sales personas + service offering doc

---

## Homepage (`src/components/Homepage.tsx`) — 13 changes

| # | Element | Old | New | Why |
|---|---------|-----|-----|-----|
| 1 | Hero H1 | Your AI pilot worked. Now nothing else has moved. | AI everywhere. Nothing shipping. | "AI pilot" only resonated with CEO/CTO. New version hooks all 5 personas. Every buyer recognizes the gap between AI talk and AI results. |
| 2 | Hero subhead | Basiq takes AI from proof of concept to production. We build and deploy the systems, and your team keeps running them after we're done. | Experiments that never become systems. Tools that never become workflows. Pilots that never reach production. We build the infrastructure that turns AI from a side project into how your company operates. | Old version was abstract. New version names the specific pattern every persona lives: things that start but don't finish. |
| 3 | Positioning statement | Most AI engagements end with a strategy doc and a thank you. Ours end with tools your team uses on Monday... | Most AI consultants leave you with a strategy deck and a list of recommendations. We leave you with production systems your team uses on Monday... | Sharper contrast. "Production systems" is more concrete than "tools." Added "We ship real things." |
| 4 | Service: Engineering | Faster PRs, better code, team-wide AI adoption. | AI-native workflows, agents that ship, production infrastructure. | Old was VP Eng language. New speaks to CTO level (production, infrastructure) while covering VP Eng concerns (workflows). |
| 5 | Service: Business Apps | Custom AI tools built for your workflows. | Process experts build their own tools. Engineers supervise. | Old was vague. New matches service offering's core concept: process experts become builders. |
| 6 | Service: Go-to-Market | AI-assisted outreach, enablement, and pipeline. | Automated prospecting, signal-based forecasting, call intelligence. | Old was generic. New names the specific systems CRO and VP Sales care about. |
| 7 | Service: Operations | Automation that actually runs without babysitting. | AI as default: writing, research, and intelligence for every employee. | Old sounded like an engineering feature. New matches service offering's framing: AI as organizational default. |
| 8 | Service: AI Strategy | Where to start, what to build, how to sequence it. | Map your highest-leverage entry points. Prove it with working prototypes. | Added the "prove it" angle. Basiq's differentiator is prototypes, not recommendations. |
| 9 | Step 1 description | We map your highest-leverage AI opportunities and deliver working prototypes, not recommendations. | We identify where AI moves the needle in your specific business and deliver working prototypes to prove it. Not a deck. Not a recommendation. | More specific. "Not a deck" is Warren's voice. |
| 10 | Step 2 description | We embed in your team and build the actual systems. Side by side with your engineers and operators. | We embed with your team and build production systems. Engineering workflows, sales automation, process tools, operational infrastructure. Whatever your highest-leverage entry point is. | Names the types of things built so all personas see themselves. |
| 11 | Step 3 description | We document, train, and hand off. You keep the tools. No retainers. No dependency. | We document, train, and hand off the keys. Your team owns everything we build. No retainer. No dependency. No phone call six months later asking for help. | Last line adds personality and addresses the CEO's consultant skepticism. |
| 12 | CTA heading | Not sure where to start? That's what the assessment is for. | Not sure where AI moves the needle? We'll show you in a week. | Creates more urgency and specificity. "A week" is concrete. |
| 13 | CTA subhead | It's free. It takes a few hours... | The assessment is free. You'll walk away with a clear picture of your highest-leverage AI opportunities and a working prototype to prove it. | Tighter. Leads with "free" more clearly. |

---

## Engineering (`src/pages/engineering.astro`) — 5 changes

| # | Element | Old | New | Why |
|---|---------|-----|-----|-----|
| 14 | Hero subhead | Most engineering teams are dabbling with AI using Co-Pilot. That's fine, but it's not a competitive advantage — it's table stakes. | Most engineering teams have AI tools installed but no playbook for using them consistently. Some engineers use them daily, others not at all. | Removes dated "Co-Pilot" reference. Adds VP Eng's #1 pain: inconsistent adoption across the team. Removes em dash. |
| 15 | Card 1: Claude Code | ...not just installed, but integrated into daily workflows. From first commit to team-wide adoption. | ...A consistent, team-wide playbook for how AI fits into coding, review, and documentation. From first commit to full adoption. | Adds "playbook" and "consistent" language from VP Eng persona. Removes em dash. |
| 16 | Card 3: AI Infrastructure | ...secure, auditable, and scalable — not a patchwork of personal API keys. | ...secure, auditable, and scalable. Something your board and security team can stand behind. Not a patchwork of personal API keys. | Adds CTO's board concern. Removes em dash. |
| 17 | Photo break line | ...doesn't spend all of its time fixing bugs. | ...doesn't hire for tasks AI can handle. | Aligns with service offering language exactly. |
| 18 | Outcome Card 3 | The repetitive work that used to require headcount — boilerplate, migrations... | The repetitive work that used to require headcount gets absorbed by agents. Boilerplate, migrations... | Removes em dash. Restructures for clarity. |

---

## Business Applications (`src/pages/business-applications.astro`) — 4 changes

| # | Element | Old | New | Why |
|---|---------|-----|-----|-----|
| 19 | Hero subhead | ...every other department — finance, HR, ops, legal, sales — where people do... | ...finance, HR, ops, legal, and sales. Every department where people do... | Removes em dashes. Reads more naturally. |
| 20 | Card 1: Embedded Engineering | ...the process expert — the person who actually does the work — and together... | ...the process expert, the person who actually does the work, and together... | Removes em dashes. Commas work fine here. |
| 21 | CTA heading | Ready to unlock your team? | Ready to give your team superpowers? | "Unlock" is a banned word. "Superpowers" matches the service offering language ("giving them superpowers"). |
| 22 | CTA body | ...It's free. It takes a few hours. | ...The assessment is free. | Tighter. Consistent with other CTAs. |

---

## Go-to-Market (`src/pages/go-to-market.astro`) — 6 changes

| # | Element | Old | New | Why |
|---|---------|-----|-----|-----|
| 23 | Hero subhead | Sales, CS, and marketing are sitting on a goldmine of data... | Your reps are busy but pipeline is still thin. Your forecast is built on optimism, not signals. Churn shows up in the quarterly report instead of the weekly alert... | Old was too abstract. New uses CRO language (forecast, pipeline) and VP Sales language (reps busy, pipeline thin). Hits both personas hard. |
| 24 | Sales card last line | Reps should be selling, not logging. | Reps focus on conversations, not data entry. | More professional tone. Same point. |
| 25 | Marketing card | Attach to your sales calls — that's your best market research. | Your sales calls are your best market research. Attach to them. | Removes em dash. More direct. |
| 26 | Photo break line | A GTM motion that runs on signal, not instinct. Every conversation becomes data. Every signal becomes action. | Reps sell instead of logging. Forecasts hold up in the board meeting. Churn gets caught before it becomes a loss. | Old repeated the H1. New describes specific outcomes that CRO and VP Sales care about. |
| 27 | Outcome Card 1 | ...Your sales team spends time on conversations, not data entry. | ...Your sales team spends its hours on conversations that close deals. | Slightly sharper. |
| 28 | Outcome Card 2 | CSMs get proactive alerts — not a quarterly churn report after the fact. | CSMs get proactive alerts, not a quarterly churn report after the fact. | Removes em dash. |

---

## Operations (`src/pages/operations.astro`) — 5 changes

| # | Element | Old | New | Why |
|---|---------|-----|-----|-----|
| 29 | Hero subhead | This is the hardest pillar to sell and the most important one to get right. The difference between companies that win with AI and companies that just spend money on AI licenses is adoption — real, habitual adoption... | The difference between companies that win with AI and companies that burn money on licenses is adoption. Not installing tools. Not running a training session. Real, habitual adoption where every employee in every function uses AI as part of how they work. | Removes internal-facing "hardest pillar to sell" language. Removes em dash. More customer-facing. |
| 30 | Card 1 | Before anyone writes anything — an email, a memo, a proposal — they go to AI first... Not to copy-paste, but to think faster. | Before anyone writes anything. An email, a memo, a proposal. They go to AI first... Not to copy-paste. To think faster. | Removes em dashes. Short sentences for rhythm. |
| 31 | Card 2 | AI unlocks data they never had access to — industry research... | AI gives them access to data that used to require expensive subscriptions or dedicated analysts. Industry research... | Removes "unlocks" (banned word). Removes em dash. More specific about what changes. |
| 32 | Card 3 | Every internal meeting, every customer call, every board review — recorded, transcribed... | Every internal meeting, every customer call, every board review. Recorded, transcribed... | Removes em dash. Period creates emphasis. |
| 33 | Outcome Card 2 | ...previously locked behind expensive subscriptions or manual effort. | ...without expensive subscriptions or hours of manual effort. | More direct. Avoids "locked" language. |

---

## AI Strategy (`src/pages/ai-strategy.astro`) — 4 changes

| # | Element | Old | New | Why |
|---|---------|-----|-----|-----|
| 34 | Hero subhead | ...They've got engineers using Copilot and a few people prompting ChatGPT. That's not an AI strategy — that's just expensive experimentation. ...Now. | ...A few engineers using coding assistants. A few people prompting chat tools. That's not a strategy. That's expensive experimentation. | Removes dated tool names (Copilot, ChatGPT). Removes em dash. Removes abrupt "Now." ending. |
| 35 | Card 1: Diagnostic | ...deliver working prototypes — not recommendations. | ...deliver working prototypes. Not recommendations. Not a strategy deck. | Removes em dash. Adds "Not a strategy deck" for the CEO who's been burned by consultants. |
| 36 | Card 2: Sequencing | ...which of our four pillars — Engineering, Business Apps, GTM, or Operations — is the right entry point... | ...which of our four pillars (Engineering, Business Apps, GTM, or Operations) is the right entry point... | Replaces em dashes with parentheses. Reads more naturally. |
| 37 | Card 3: Embedded Execution | We work in focused sprints — embedding with your team... | We work in focused sprints. Embedding with your team... | Removes em dash. |

---

## Pages NOT Changed

| Page | Reason |
|------|--------|
| Pricing (`/pricing`) | Placeholder with generic SaaS pricing. Needs full redesign, not copy edits. |
| Qenerate (`/qenerate`) | Product page for a different audience (AEs). Out of scope for this audit pass. |
| Blog (`/blog`) | CMS-managed content. |

---

## Systematic Fixes Applied Across All Pages

1. **All em dashes removed** — replaced with periods, commas, or parentheses depending on context (37 changes total)
2. **Banned words removed** — "unlock" (Business Apps CTA), "unlocks" (Operations card 2)
3. **Dated tool references removed** — "Co-Pilot" (Engineering), "Copilot" and "ChatGPT" (AI Strategy)
4. **Service descriptions aligned with service offering doc** — especially Business Apps, GTM, and Operations which were significantly vaguer than the source of truth
5. **CRO and VP Sales pain points added** — especially on Go-to-Market hero and Homepage service descriptions
6. **Internal-facing language removed** — "hardest pillar to sell" (Operations)
