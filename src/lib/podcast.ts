/**
 * Selling AI show and episode data, read from Sanity at build time.
 *
 * Consumed by /podcast, /episode/[slug], and the llms generators. Every fetcher
 * degrades to null/[] when Sanity is unreachable so a build never fails on it.
 */
import { sanityClient } from "./sanity";
import { SITE_URL } from "./site-pages";

/**
 * basiq.work is the primary home for Selling AI. Episodes 1 to 28 were first
 * published on gettopiq.ai at /selling-ai-podcast; any episode that exists in
 * both places must have its canonical dropped on gettopiq.ai, or the two sites
 * compete for the same episode queries.
 */
export const PODCAST_CANONICAL_ORIGIN = SITE_URL;

/**
 * Path for the show index on this site. The trailing slash is load bearing:
 * every other canonical on the site carries one and @astrojs/sitemap emits
 * trailing-slash URLs, so dropping it here makes the sitemap and the canonical
 * disagree, which Search Console reports as a duplicate.
 */
export const PODCAST_CANONICAL_PATH = "/podcast/";

/** Canonical URL for one episode, matching the site's trailing slash convention. */
export function episodeCanonical(slug: string): string {
  return `${PODCAST_CANONICAL_ORIGIN}/episode/${slug}/`;
}

export interface Show {
  title: string;
  tagline: string | null;
  description: string | null;
  applePodcastsUrl: string | null;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
  artworkUrl: string | null;
  hostName: string | null;
  hostBio: string | null;
  hostImageUrl: string | null;
}

export interface Chapter {
  timestamp: string;
  title: string;
}

export interface Episode {
  episodeNumber: number;
  title: string;
  slug: string;
  publishedAt: string | null;
  duration: number | null;
  summary: string | null;
  keyQuote: string | null;
  guestName: string | null;
  guestTitle: string | null;
  guestBio: string | null;
  takeaways: string[];
  chapters: Chapter[];
  youtubeId: string | null;
  applePodcastsUrl: string | null;
  spotifyUrl: string | null;
}

const EPISODE_FIELDS = `
  episodeNumber, title, "slug": slug.current, publishedAt, duration,
  summary, keyQuote, guestName, guestTitle, guestBio, takeaways, chapters,
  youtubeId, applePodcastsUrl, spotifyUrl
`;

export async function getShow(): Promise<Show | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<Show>(
      `*[_type == "podcast"][0] {
        title, tagline, description, applePodcastsUrl, spotifyUrl, youtubeUrl,
        artworkUrl, hostName, hostBio, hostImageUrl
      }`,
    );
  } catch {
    return null;
  }
}

export async function getEpisodes(): Promise<Episode[]> {
  if (!sanityClient) return [];
  try {
    const rows = await sanityClient.fetch<Episode[]>(
      `*[_type == "episode" && defined(slug.current)] | order(episodeNumber desc) {${EPISODE_FIELDS}}`,
    );
    return rows ?? [];
  } catch {
    return [];
  }
}

export async function getEpisode(slug: string): Promise<Episode | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<Episode>(
      `*[_type == "episode" && slug.current == $slug][0] {${EPISODE_FIELDS}}`,
      { slug },
    );
  } catch {
    return null;
  }
}

/** "38 min" / "Aug 5, 2026" style metadata, skipping anything unset. */
export function episodeMeta(episode: Episode): string[] {
  const parts: string[] = [];
  if (episode.duration) parts.push(`${episode.duration} min`);
  if (episode.publishedAt) {
    parts.push(
      new Date(episode.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    );
  }
  return parts;
}

/**
 * Meta descriptions get truncated by search engines around 155 characters, and
 * an episode summary is a full paragraph. Cut on a word boundary instead.
 */
export function metaDescription(text: string, max = 155): string {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}...`;
}
