import type { APIRoute } from "astro";
import { sitePages, absUrl, SITE_URL, SECTION_ORDER } from "../lib/site-pages";
import { getBlogPosts } from "../lib/site-dynamic";

export const prerender = true;

const SUMMARY =
  "Basiq is a revenue execution platform for mid-market and enterprise teams running multi-meeting sales cycles. It runs off meeting transcripts instead of CRM data entry: the transcript is the source of truth, and the seller's task list, the CRM record, the forecast and the enablement docs are downstream artifacts that fan out from it.";

const INTRO =
  "How it works: every call becomes the record, the next day is served to each seller as a task queue in priority order carrying the context of every prior conversation, and an approve-or-decline loop proposes edits to the persona and value proposition docs that every prompt reads from. Basiq integrates with Salesforce and HubSpot rather than replacing them. The platform ships as four products (Qindle, Topiq, Fabriq, and Musal) and Basiq also runs hands-on AI masterclasses.";

export const GET: APIRoute = async () => {
  const lines: string[] = [];
  lines.push("# Basiq", "", `> ${SUMMARY}`, "", `${INTRO} Live site: ${SITE_URL}`, "");

  for (const section of SECTION_ORDER) {
    const pages = sitePages.filter((p) => p.llms && p.section === section);
    if (pages.length === 0) continue;
    lines.push(`## ${section}`);
    for (const page of pages) {
      lines.push(`- [${page.title}](${absUrl(page.path)}): ${page.description}`);
    }
    lines.push("");
  }

  const posts = await getBlogPosts();
  if (posts.length > 0) {
    lines.push("## Blog posts");
    for (const post of posts) {
      const desc = post.excerpt ? `: ${post.excerpt}` : "";
      lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug})${desc}`);
    }
    lines.push("");
  }

  lines.push("## Optional");
  lines.push(`- [Full content](${SITE_URL}/llms-full.txt): Expanded single-file overview of Basiq for LLMs.`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
