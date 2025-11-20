import { defineCollection, z } from 'astro:content';

const baseDocSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  section: z.string().default('General'),
  order: z.number().int().nonnegative().default(0),
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
};
