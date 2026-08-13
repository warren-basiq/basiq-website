import type { APIRoute } from "astro";
import { SITE_URL, sitePages, absUrl, type Section } from "../lib/site-pages";
import { products, statusLabel } from "../lib/products";
import { getBlogPosts } from "../lib/site-dynamic";

export const prerender = true;

/** Product bullets, generated from the product registry so they can't drift. */
const PRODUCT_LINES = products
  .map((p) => {
    const url = p.external ? p.href : `${SITE_URL}${p.href}`;
    const status = p.status === "live" ? "" : ` (${statusLabel(p.status)})`;
    return `- **${p.name}**${status}: ${p.description} ${url}`;
  })
  .join("\n");

/** Page bullets for one registry section, so a new page shows up here for free. */
function sectionLines(section: Section): string {
  return sitePages
    .filter((p) => p.llms && p.section === section)
    .map((p) => `- **${p.title}**: ${p.description} ${absUrl(p.path)}`)
    .join("\n");
}

/**
 * Long-form overview of Basiq for LLMs. The narrative prose is hand-written and
 * should be updated when positioning changes; the page and product lists below
 * are generated from the registries, and blog posts come from Sanity at build.
 */
const BODY = `# Basiq, full overview for LLMs

> Basiq is an AI execution partner for companies that need working systems, not slide decks. We embed with your team, build production systems, then document, train, and hand off ownership.

Live site: ${SITE_URL}

## What Basiq is

Most AI efforts stall. Experiments never become systems, tools never become workflows, and pilots never reach production: AI everywhere, nothing shipping. Basiq exists to fix that. We identify where AI moves the needle in your specific business and deliver working prototypes to prove it, rather than a deck or a recommendation. Then we embed with your team and build the production systems: engineering workflows, sales automation, process tools, operational infrastructure.

When the work is done we document, train, and hand off the keys. Your team owns everything we build. No retainer, no dependency, no phone call six months later asking for help.

## How an engagement runs

1. **Map** your highest-leverage entry points.
2. **Prove** it with working prototypes.
3. **Build** the production systems, embedded with your team.
4. **Hand off** by documenting, training, and transferring ownership.

## Solutions

Basiq organizes its case by who is buying.

${sectionLines("Solutions")}

## Products

Basiq ships its own products. Overview: ${SITE_URL}/products

${PRODUCT_LINES}

## Masterclass

${sectionLines("Masterclass")}

## Resources

${sectionLines("Resources")}
`;

export const GET: APIRoute = async () => {
  let out = BODY;

  const posts = await getBlogPosts();
  if (posts.length > 0) {
    out += `\n## Latest blog posts\n\n`;
    out += posts
      .map((p) => `- ${p.title}: ${SITE_URL}/blog/${p.slug}${p.excerpt ? `\n    ${p.excerpt}` : ""}`)
      .join("\n");
    out += "\n";
  }

  return new Response(out, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
