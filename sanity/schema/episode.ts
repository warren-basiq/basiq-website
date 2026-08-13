import { defineField, defineType } from "sanity";

export const episode = defineType({
  name: "episode",
  title: "Podcast Episode",
  type: "document",
  fields: [
    defineField({
      name: "episodeNumber",
      title: "Episode Number",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({
      name: "duration",
      title: "Duration (minutes)",
      type: "number",
    }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 4 }),
    defineField({
      name: "keyQuote",
      title: "Key Quote",
      description: "Pulled out as the episode's pull quote.",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "guestName", title: "Guest Name", type: "string" }),
    defineField({ name: "guestTitle", title: "Guest Title and Company", type: "string" }),
    defineField({ name: "guestBio", title: "Guest Bio", type: "text", rows: 4 }),
    defineField({
      name: "takeaways",
      title: "Key Takeaways",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "chapters",
      title: "Chapters",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "timestamp", title: "Timestamp", type: "string" },
            { name: "title", title: "Title", type: "string" },
          ],
          preview: {
            select: { title: "title", subtitle: "timestamp" },
          },
        },
      ],
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube Video ID",
      description: "Just the id, e.g. dQw4w9WgXcQ. Renders the episode player.",
      type: "string",
    }),
    defineField({ name: "applePodcastsUrl", title: "Apple Podcasts URL", type: "url" }),
    defineField({ name: "spotifyUrl", title: "Spotify URL", type: "url" }),
  ],
  orderings: [
    {
      title: "Episode Number, New",
      name: "episodeNumberDesc",
      by: [{ field: "episodeNumber", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "episodeNumber" },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `Ep. ${subtitle}` }),
  },
});
