import type { APIRoute } from "astro";
import { SITE_URL } from "../lib/site-pages";
import { products, statusLabel } from "../lib/products";
import { getBlogPosts } from "../lib/site-dynamic";

export const prerender = true;

/** Product bullets, generated from the product registry so they can't drift. */
const PRODUCT_LINES = products
  .map((p) => {
    const url = p.external ? p.href : `${SITE_URL}${p.href}`;
    const status = p.status === "live" ? "" : ` (${statusLabel(p.status)})`;
    return `- **${p.name}**${status} — ${p.description} ${url}`;
  })
  .join("\n");

/**
 * Long-form, hand-curated overview of Basiq for LLMs. All copy below is drawn
 * from the live site. Update this prose when the positioning or offerings
 * change. Dynamic content (blog posts) is appended from Sanity at the bottom.
 */
const BODY = `# Basiq — Full Overview for LLMs

> Basiq is an AI execution partner for companies that need working systems, not slide decks. We embed with your team, build production systems, then document, train, and hand off ownership.

Live site: ${SITE_URL}

## What Basiq is

Most AI efforts stall: experiments that never become systems, tools that never become workflows, pilots that never reach production — "AI everywhere, nothing shipping." Basiq exists to fix that. We identify where AI moves the needle in your specific business and deliver working prototypes to prove it — not a deck, not a recommendation. Then we embed with your team and build the production systems: engineering workflows, sales automation, process tools, operational infrastructure.

When the work is done we document, train, and hand off the keys. Your team owns everything we build. No retainer, no dependency, no phone call six months later asking for help.

## How an engagement runs

1. **Map** your highest-leverage entry points.
2. **Prove** it with working prototypes.
3. **Build** the production systems, embedded with your team.
4. **Hand off** — document, train, and transfer ownership.

## What we do

- **AI Strategy** — Where to start, what to build, how to sequence it. From diagnostic to fully AI-enabled. ${SITE_URL}/ai-strategy
- **Engineering** — Go from AI-curious to AI-native; build an engineering org that runs AI end-to-end. ${SITE_URL}/engineering
- **Go-to-Market** — AI-powered sales, CS, and marketing: automated prospecting, signal-based forecasting, call intelligence. A GTM motion that runs on signal, not instinct. ${SITE_URL}/go-to-market
- **Operations** — AI as a default for every employee, not just the tech team: writing, research, and intelligence across the org. ${SITE_URL}/operations
- **Business Applications** — Turn process experts into builders. Internal apps built by the people who need them, with engineers supervising. ${SITE_URL}/business-applications

## Products

Basiq ships its own products. Overview: ${SITE_URL}/products

${PRODUCT_LINES}

## Masterclass

- **Claude Code 101** — A hands-on introduction for non-technical teams: install Claude Code, learn command-line basics, and start building real apps and automations in plain English. ${SITE_URL}/masterclass/claude-code-101
- **Build a Website with Claude Code** — Step-by-step: build and deploy a professional website using Claude Code, no coding experience required. ${SITE_URL}/masterclass/claude-code-website

## Resources

- **Blog** — Insights and updates from the Basiq team. ${SITE_URL}/blog
`;

export const GET: APIRoute = async () => {
  let out = BODY;

  const posts = await getBlogPosts();
  if (posts.length > 0) {
    out += `\n## Latest blog posts\n\n`;
    out += posts
      .map((p) => `- ${p.title} — ${SITE_URL}/blog/${p.slug}${p.excerpt ? `\n    ${p.excerpt}` : ""}`)
      .join("\n");
    out += "\n";
  }

  return new Response(out, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
