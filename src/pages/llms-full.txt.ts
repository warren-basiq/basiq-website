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

> Basiq is a revenue execution platform for mid-market and enterprise teams running multi-meeting sales cycles. It runs off meeting transcripts instead of CRM data entry: the transcript is the source of truth, and the task list, the CRM record, the forecast and the enablement docs are downstream artifacts that fan out from it. Basiq integrates with Salesforce and HubSpot rather than replacing them.

Live site: ${SITE_URL}

## What Basiq is

Revenue organizations run on the CRM opportunity record, and every process is built around extracting information from meetings and typing it into fields. Basiq inverts that. The meeting transcript is the source of truth, and the CRM record, the seller's task list, the forecast and the enablement documents are all downstream artifacts that fan out from what actually happened in the conversation.

The end state: the seller's day is a served queue. Every task needed to generate pipeline, progress deals and grow customers sits in front of them in priority order, generated from the full context of every meeting they have ever had. The rep never decides what to do next and never reconstructs context before acting. Because reps work the queue, the data underneath is complete as a byproduct rather than as a discipline, and complete data is what makes the next day's queue right.

Basiq is not competing for the system of record. It integrates with Salesforce and HubSpot; it changes what feeds them.

## How it works

1. **The meeting becomes the record.** The transcript is the input. CRM fields, MEDDIC movement, follow-ups owed and forecast inputs fan out from it.
2. **The day is served.** Each seller gets their tasks in priority order, each carrying the context of every prior conversation. The queue runs across AEs, AMs and CSMs, so it spans pre-sale and post-sale.
3. **The documents update themselves, with a human gate.** Each transcript is compared against the persona and value proposition docs, and specific edits are proposed. Revops or enablement approves or declines each one, and the approved version is what every prompt reads from next run.
4. **Execution becomes a controlled variable.** Because tasks are served and completion is tracked, a leader can tell whether the playbook was actually run, which narrows a missed quarter to a short list of causes instead of a debate.

## Who it is for

Mid-market and enterprise revenue teams running multi-meeting sales cycles, who are actively working on revenue efficiency or growth. Poor fit: one-call closes, inbound-only motions with no interest in outbound, and orgs with no customer success motion. The buying committee is typically a CRO, VP RevOps or VP Sales signing, AEs and sales leaders using it daily.

**Status, stated plainly:** the positioning above is a hypothesis. Basiq has one paying customer and roughly six trial users, all recent. Claims here are design arguments and third-party research, not customer evidence at scale.

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
