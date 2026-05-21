/**
 * Build-time fetchers for dynamic, Sanity-backed content that feeds the llms
 * generators. Degrades to [] when the Sanity client is unavailable (e.g. env
 * not configured) so a build never fails because of these auxiliary files.
 */
import { sanityClient } from "./sanity";

export interface BlogPostRef {
  title: string;
  slug: string;
  publishedAt: string | null;
  excerpt: string | null;
}

export async function getBlogPosts(): Promise<BlogPostRef[]> {
  if (!sanityClient) return [];
  try {
    const rows = await sanityClient.fetch<
      { title: string; slug: { current: string }; publishedAt?: string; excerpt?: string }[]
    >(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
        title, slug, publishedAt, excerpt
      }`,
    );
    return rows.map((p) => ({
      title: p.title,
      slug: p.slug.current,
      publishedAt: p.publishedAt ?? null,
      excerpt: p.excerpt ?? null,
    }));
  } catch {
    return [];
  }
}
