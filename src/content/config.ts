import { defineCollection, z } from 'astro:content';

const baseDocSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  section: z.string().default('General'),
  order: z.number().int().nonnegative().default(0),
});

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export const collections = {
  docsPublic: defineCollection({
    type: 'content',
    schema: baseDocSchema,
  }),
  docsPrivate: defineCollection({
    type: 'content',
    schema: baseDocSchema,
  }),
  blog: defineCollection({
    type: 'content',
    schema: blogSchema,
  }),
};
