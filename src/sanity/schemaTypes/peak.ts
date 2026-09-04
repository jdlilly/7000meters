import { defineField, defineType } from "sanity";

export const peak = defineType({
  name: "peak",
  title: "Peak",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "namesOther",
      title: "Other names",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "elevationM",
      title: "Elevation (m)",
      type: "number",
      validation: (rule) => rule.required().min(7000).max(7999),
    }),
    defineField({
      name: "prominenceM",
      title: "Prominence (m)",
      type: "number",
    }),
    defineField({
      name: "class",
      title: "Class",
      type: "string",
      options: {
        list: [
          { title: "Independent", value: "independent" },
          { title: "Named subsidiary", value: "subsidiary" },
        ],
        layout: "radio",
      },
      initialValue: "independent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "countries",
      title: "Countries",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "range",
      title: "Range",
      type: "string",
    }),
    defineField({
      name: "subrange",
      title: "Subrange",
      type: "string",
    }),
    defineField({
      name: "lat",
      title: "Latitude",
      type: "number",
    }),
    defineField({
      name: "lon",
      title: "Longitude",
      type: "number",
    }),
    defineField({
      name: "firstAscentYear",
      title: "First ascent year",
      type: "number",
    }),
    defineField({
      name: "climbed",
      title: "Climbed",
      type: "boolean",
      description: "Accepted summit exists.",
      initialValue: true,
    }),
    defineField({
      name: "guided",
      title: "Guided",
      type: "boolean",
      description:
        "At least two companies offer a guided climb to the summit.",
      initialValue: false,
    }),
    defineField({
      name: "outfitters",
      title: "Guiding companies",
      type: "array",
      description: "Companies that advertise a guided climb to this summit.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Company",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Website",
              type: "url",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "links",
      title: "Further reading",
      type: "array",
      description: "Peak-specific articles, route reports, and reference pages.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "heroImage",
      title: "Hero photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
        defineField({
          name: "credit",
          title: "Photo credit",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      elevationM: "elevationM",
      media: "heroImage",
    },
    prepare({ title, elevationM, media }) {
      return {
        title,
        subtitle: elevationM ? `${elevationM} m` : "No elevation",
        media,
      };
    },
  },
});