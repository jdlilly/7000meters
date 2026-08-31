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
      name: "class",
      title: "Class",
      type: "string",
      options: {
        list: [
          { title: "Independent (≥ 500 m prominence)", value: "independent" },
          { title: "Named subsidiary", value: "subsidiary" },
        ],
        layout: "radio",
      },
      initialValue: "independent",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Parent peak",
      type: "reference",
      to: [{ type: "peak" }],
      hidden: ({ document }) => document?.class !== "subsidiary",
    }),
    defineField({
      name: "elevationM",
      title: "Elevation (m)",
      type: "number",
      validation: (rule) => rule.required().min(7000).max(7999.9),
    }),
    defineField({
      name: "prominenceM",
      title: "Prominence (m)",
      type: "number",
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
      name: "firstAscentYear",
      title: "First ascent year",
      type: "number",
    }),
    defineField({
      name: "climbed",
      title: "Has been climbed",
      type: "boolean",
      initialValue: true,
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
    defineField({
      name: "overview",
      title: "Overview",
      type: "text",
      rows: 6,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "elevationM" },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} m` : "No elevation",
      };
    },
  },
});