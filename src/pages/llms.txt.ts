import type { APIRoute } from "astro";
import { sitePages, absUrl, SITE_URL, SECTION_ORDER } from "../lib/site-pages";
import { getBlogPosts } from "../lib/site-dynamic";

export const prerender = true;

const SUMMARY =
  "Basiq is an AI execution partner for companies that need working systems, not slide decks. We embed with your team, build production systems — engineering workflows, sales automation, process tools, operational infrastructure — then document, train, and hand off ownership. No retainer, no dependency.";

const INTRO =
  "Engagement model: map the highest-leverage entry points, prove them with working prototypes, build the infrastructure in production, then hand off the keys. Basiq also ships its own products — Topiq, Fabriq, Musal, Qindle, and LaneScout — and runs hands-on AI masterclasses.";

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
