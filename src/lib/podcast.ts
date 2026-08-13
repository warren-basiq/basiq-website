/**
 * Selling AI show and episode data, read from Sanity at build time.
 *
 * Consumed by /podcast, /episode/[slug], and the llms generators. Every fetcher
 * degrades to null/[] when Sanity is unreachable so a build never fails on it.
 */
import { sanityClient } from "./sanity";

/**
 * Selling AI also lives on gettopiq.ai, which published it first. Both copies
 * canonical there so the two sites don't compete for the same episode queries.
 * To make basiq.work the primary home instead, set this to SITE_URL and drop
 * the equivalent tags on gettopiq.ai.
 */
export const PODCAST_CANONICAL_ORIGIN = "https://www.gettopiq.ai";

/** Path for the show on gettopiq.ai, which does not match ours. */
export const PODCAST_CANONICAL_PATH = "/selling-ai-podcast";

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
