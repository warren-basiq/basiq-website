import { defineField, defineType } from "sanity";

/** The show itself. A single document drives /podcast; only the first is read. */
export const podcast = defineType({
  name: "podcast",
  title: "Podcast Show",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Show Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "One line under the show title, e.g. the podcast for revenue teams.",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "applePodcastsUrl", title: "Apple Podcasts URL", type: "url" }),
    defineField({ name: "spotifyUrl", title: "Spotify URL", type: "url" }),
    defineField({ name: "youtubeUrl", title: "YouTube URL", type: "url" }),
    defineField({
      name: "artworkUrl",
      title: "Artwork URL",
      description: "Absolute path or full URL to the show artwork.",
      type: "string",
    }),
    defineField({ name: "hostName", title: "Host Name", type: "string" }),
    defineField({ name: "hostBio", title: "Host Bio", type: "text", rows: 5 }),
    defineField({
      name: "hostImageUrl",
      title: "Host Image URL",
      type: "string",
    }),
  ],
});
