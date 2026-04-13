# Basiq Website Copy Updates — Claude Code Prompt

Paste this entire prompt into Claude Code. It contains find-and-replace instructions for every copy change across the site. Do NOT change any styling, classes, HTML structure, or anything else. Only change the text content specified below.

---

## FILE 1: `src/components/Homepage.tsx`

### Change 1: Hero H1
Find the `words` prop on the `TextGenerateEffect` component:
```
words="Your AI pilot worked. Now nothing else has moved."
```
Replace with:
```
words="AI everywhere. Nothing shipping."
```

### Change 2: Hero Subhead
Find the paragraph after the TextGenerateEffect:
```
Basiq takes AI from proof of concept to production. We build and deploy the systems, and your team keeps running them after we're done.
```
Replace with:
```
Experiments that never become systems. Tools that never become workflows. Pilots that never reach production. We build the infrastructure that turns AI from a side project into how your company operates.
```

### Change 3: Positioning Statement
Find the paragraph inside the "POSITIONING STATEMENT" section:
```
Most AI engagements end with a strategy doc and a thank you. Ours
              end with tools your team uses on Monday. We work alongside your
              engineers, sales teams, and ops. And we leave when there's a
              working system in place, not before.
```
Replace with:
```
Most AI consultants leave you with a strategy deck and a list of recommendations. We leave you with production systems your team uses on Monday. We embed with your engineers, sales teams, and operators. We ship real things. And we hand off ownership when it works, not before.
```

### Change 4: Service Description — Engineering
Find in the `services` array:
```
description: "Faster PRs, better code, team-wide AI adoption.",
```
Replace with:
```
description: "AI-native workflows, agents that ship, production infrastructure.",
```

### Change 5: Service Description — Business Applications
Find:
```
description: "Custom AI tools built for your workflows.",
```
Replace with:
```
description: "Process experts build their own tools. Engineers supervise.",
```

### Change 6: Service Description — Go-to-Market
Find:
```
description: "AI-assisted outreach, enablement, and pipeline.",
```
Replace with:
```
description: "Automated prospecting, signal-based forecasting, call intelligence.",
```

### Change 7: Service Description — Operations
Find:
```
description: "Automation that actually runs without babysitting.",
```
Replace with:
```
description: "AI as default: writing, research, and intelligence for every employee.",
```

### Change 8: Service Description — AI Strategy
Find:
```
description: "Where to start, what to build, how to sequence it.",
```
Replace with:
```
description: "Map your highest-leverage entry points. Prove it with working prototypes.",
```

### Change 9: How It Works — Step 1 Description
Find:
```
"We map your highest-leverage AI opportunities and deliver working prototypes, not recommendations.",
```
Replace with:
```
"We identify where AI moves the needle in your specific business and deliver working prototypes to prove it. Not a deck. Not a recommendation.",
```

### Change 10: How It Works — Step 2 Description
Find:
```
"We embed in your team and build the actual systems. Side by side with your engineers and operators.",
```
Replace with:
```
"We embed with your team and build production systems. Engineering workflows, sales automation, process tools, operational infrastructure. Whatever your highest-leverage entry point is.",
```

### Change 11: How It Works — Step 3 Description
Find:
```
"We document, train, and hand off. You keep the tools. No retainers. No dependency.",
```
Replace with:
```
"We document, train, and hand off the keys. Your team owns everything we build. No retainer. No dependency. No phone call six months later asking for help.",
```

### Change 12: CTA Heading
Find:
```
Not sure where to start?
                <br />
                That's what the assessment is for.
```
Replace with:
```
Not sure where AI moves the needle?
                <br />
                We'll show you in a week.
```

### Change 13: CTA Subhead
Find:
```
It's free. It takes a few hours. You'll walk away with a clear picture of where AI
                moves the needle for your business and a working prototype to prove it.
```
Replace with:
```
The assessment is free. You'll walk away with a clear picture of your highest-leverage AI opportunities and a working prototype to prove it.
```

---

## FILE 2: `src/pages/engineering.astro`

### Change 14: Hero Subhead
Find:
```
Most engineering teams are dabbling with AI using Co-Pilot. That's
          fine, but it's not a competitive advantage &mdash; it's table stakes.
          We build engineering organizations that run AI natively end-to-end.
```
Replace with:
```
Most engineering teams have AI tools installed but no playbook for using them consistently. Some engineers use them daily, others not at all. We build engineering organizations where AI is wired into how you code, review, and ship. Not table stakes. Competitive advantage.
```

### Change 15: Card 1 — Claude Code Integration
Find:
```
We get your team set up and actually using AI coding tools &mdash;
                not just installed, but integrated into daily workflows. From first
                commit to team-wide adoption.
```
Replace with:
```
We get Claude Code into your daily workflow, not just your editor. A consistent, team-wide playbook for how AI fits into coding, review, and documentation. From first commit to full adoption.
```

### Change 16: Card 3 — AI Infrastructure
Find:
```
Getting the right architecture in place so your AI usage is secure,
                auditable, and scalable &mdash; not a patchwork of personal API
                keys.
```
Replace with:
```
Getting the right architecture in place so your AI usage is secure, auditable, and scalable. Something your board and security team can stand behind. Not a patchwork of personal API keys.
```

### Change 17: Photo Break Result Line
Find:
```
An engineering team that ships faster, reviews smarter, and doesn't spend all of its time fixing bugs.
```
Replace with:
```
An engineering team that ships faster, reviews smarter, and doesn't hire for tasks AI can handle.
```

### Change 18: Outcome Card 3 — Scale Without Hiring
Find:
```
The repetitive work that used to require headcount &mdash;
                boilerplate, migrations, test generation, docs &mdash; gets
                absorbed by agents. Your team grows in capability, not cost.
```
Replace with:
```
The repetitive work that used to require headcount gets absorbed by agents. Boilerplate, migrations, test generation, docs. Your team grows in capability, not cost.
```

---

## FILE 3: `src/pages/business-applications.astro`

### Change 19: Hero Subhead
Find:
```
Your biggest efficiency gains aren't in engineering. They're in every
          other department &mdash; finance, HR, ops, legal, sales &mdash; where
          people do repetitive, high-stakes work nobody has automated because it
          required an engineer. That's no longer true.
```
Replace with:
```
Your biggest efficiency gains aren't in engineering. They're in finance, HR, ops, legal, and sales. Every department where people do repetitive, high-stakes work nobody automated because it required an engineer. That's no longer the constraint.
```

### Change 20: Card 1 — Embedded Engineering
Find:
```
We embed one or two engineers into each function of your business.
                They sit with the process expert &mdash; the person who actually
                does the work &mdash; and together they identify and build the
                applications that matter.
```
Replace with:
```
We embed one or two engineers into each function of your business. They sit with the process expert, the person who actually does the work, and together they identify and build the applications that matter.
```

### Change 21: CTA Heading
Find:
```
Ready to unlock your team?
```
Replace with:
```
Ready to give your team superpowers?
```

### Change 22: CTA Body
Find in business-applications.astro:
```
Every engagement starts with a diagnostic: where are you today,
            where's the highest-value entry point, and what does "fully
            AI-enabled" look like for your business? It's free. It takes a few hours.
```
Replace with:
```
Every engagement starts with a diagnostic: where are you today, where's the highest-value entry point, and what does "fully AI-enabled" look like for your business? The assessment is free.
```

---

## FILE 4: `src/pages/go-to-market.astro`

### Change 23: Hero Subhead
Find:
```
Sales, CS, and marketing are sitting on a goldmine of data they're not
          using. Every call you're not recording is a missed opportunity. Every
          CRM field your reps aren't updating is a forecasting blind spot. We fix
          that across all three GTM functions.
```
Replace with:
```
Your reps are busy but pipeline is still thin. Your forecast is built on optimism, not signals. Churn shows up in the quarterly report instead of the weekly alert. Every call, every CRM field, every deal signal has value your team isn't capturing. We build the systems that change that across sales, CS, and marketing.
```

### Change 24: Sales Card — Last Sentence
Find:
```
Reps should be selling, not logging.
```
Replace with:
```
Reps focus on conversations, not data entry.
```

### Change 25: Marketing Card
Find:
```
Attach to your sales calls &mdash; that's your best market
                research. Identify messaging gaps, competitive intel, and customer
                language. Automate content generation grounded in real customer
                voice, not assumptions.
```
Replace with:
```
Your sales calls are your best market research. Attach to them. Identify messaging gaps, competitive intel, and customer language. Automate content generation grounded in real conversations, not guesswork.
```

### Change 26: Photo Break Result Line
Find:
```
A GTM motion that runs on signal, not instinct. Every conversation
              becomes data. Every signal becomes action.
```
Replace with:
```
Reps sell instead of logging. Forecasts hold up in the board meeting. Churn gets caught before it becomes a loss.
```

### Change 27: Outcome Card 1 — Reps sell, AI handles the rest
Find:
```
Prospecting, research, CRM hygiene, and follow-ups happen
              automatically. Your sales team spends time on conversations, not
              data entry.
```
Replace with:
```
Prospecting, research, CRM hygiene, and follow-ups happen automatically. Your sales team spends its hours on conversations that close deals.
```

### Change 28: Outcome Card 2 — Risk surfaces before it's too late
Find:
```
Every customer call is analyzed for risk signals. CSMs get proactive
              alerts &mdash; not a quarterly churn report after the fact.
```
Replace with:
```
Every customer call is analyzed for risk signals. CSMs get proactive alerts, not a quarterly churn report after the fact.
```

---

## FILE 5: `src/pages/operations.astro`

### Change 29: Hero Subhead
Find:
```
This is the hardest pillar to sell and the most important one to get
          right. The difference between companies that win with AI and companies
          that just spend money on AI licenses is adoption &mdash; real, habitual
          adoption across every function and every role.
```
Replace with:
```
The difference between companies that win with AI and companies that burn money on licenses is adoption. Not installing tools. Not running a training session. Real, habitual adoption where every employee in every function uses AI as part of how they work.
```

### Change 30: Card 1 — AI-First Writing & Thinking
Find:
```
Before anyone writes anything &mdash; an email, a memo, a proposal
                &mdash; they go to AI first. Stuck on a problem? Talk to Claude
                before calling a meeting. Not to copy-paste, but to think faster.
```
Replace with:
```
Before anyone writes anything. An email, a memo, a proposal. They go to AI first. Stuck on a problem? Talk to Claude before calling a meeting. Not to copy-paste. To think faster.
```

### Change 31: Card 2 — Access to New Data Sets
Find:
```
Your teams are making decisions with the information they've always
                had. AI unlocks data they never had access to &mdash; industry
                research, competitive intelligence, customer signals, market
                trends.
```
Replace with:
```
Your teams are making decisions with the information they've always had. AI gives them access to data that used to require expensive subscriptions or dedicated analysts. Industry research, competitive intelligence, customer signals, market trends.
```

### Change 32: Card 3 — Conversational Intelligence
Find:
```
Every internal meeting, every customer call, every board review
                &mdash; recorded, transcribed, summarized, actioned. The work that
                used to happen after the meeting now happens automatically.
```
Replace with:
```
Every internal meeting, every customer call, every board review. Recorded, transcribed, summarized, actioned. The work that used to happen after the meeting now happens automatically.
```

### Change 33: Outcome Card 2 — Better decisions
Find:
```
Teams access industry research, competitive intelligence, and market
              signals that were previously locked behind expensive subscriptions
              or manual effort.
```
Replace with:
```
Teams access industry research, competitive intelligence, and market signals without expensive subscriptions or hours of manual effort.
```

---

## FILE 6: `src/pages/ai-strategy.astro`

### Change 34: Hero Subhead
Find:
```
Most companies dabbling in AI are leaving 80% of the value on the table.
          They've got engineers using Copilot and a few people prompting ChatGPT.
          That's not an AI strategy &mdash; that's just expensive experimentation.
          We help you operationalize AI across your business. Now.
```
Replace with:
```
Most companies dabbling in AI are leaving 80% of the value on the table. A few engineers using coding assistants. A few people prompting chat tools. That's not a strategy. That's expensive experimentation. We help you operationalize AI across your business.
```

### Change 35: Card 1 — Diagnostic
Find:
```
We map where you are today, identify your highest-leverage AI
                opportunities, and deliver working prototypes &mdash; not
                recommendations. The assessment is free and takes a few hours.
```
Replace with:
```
We map where you are today, identify your highest-leverage AI opportunities, and deliver working prototypes. Not recommendations. Not a strategy deck. The assessment is free and takes a few hours.
```

### Change 36: Card 2 — Sequencing
Find:
```
We figure out which of our four pillars &mdash; Engineering,
                Business Apps, GTM, or Operations &mdash; is the right entry
                point for where you are. Then we sequence the rest.
```
Replace with:
```
We figure out which of our four pillars (Engineering, Business Apps, GTM, or Operations) is the right entry point for where you are. Then we sequence the rest.
```

### Change 37: Card 3 — Embedded Execution
Find:
```
We work in focused sprints &mdash; embedding with your team,
                building real things, and getting to outcomes fast. We're here to
                build alongside you until you don't need us anymore.
```
Replace with:
```
We work in focused sprints. Embedding with your team, building real things, and getting to outcomes fast. We're here to build alongside you until you don't need us anymore.
```

---

## FILES NOT CHANGED

- **`src/pages/pricing.astro`** — This is a placeholder with generic SaaS pricing ($29/$79/Custom). It needs a full redesign, not a copy edit. Do not touch it.
- **`src/pages/qenerate.astro`** — Product page for a different audience. No changes in this pass.
- **`src/pages/blog/`** — CMS-managed content. No changes.

---

## IMPORTANT INSTRUCTIONS

1. Only change the text content specified above. Do not modify any HTML tags, CSS classes, Tailwind classes, component props (except `words` on TextGenerateEffect), or page structure.
2. Preserve all `&mdash;` removal — in every case where an `&mdash;` was removed, a period or comma replaces it. Do not re-add em dashes.
3. For Homepage.tsx changes, be careful with JSX string syntax vs HTML entities. Homepage.tsx uses plain characters, not `&mdash;`.
4. After making all changes, run `npm run build` to verify nothing is broken.
