import { defineCollection, type SchemaContext } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

/** Campos compartidos por productos y servicios. */
const baseSchema = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    Image: image(),
    description: z.string(),
    /** Carpeta dentro de src/assets/images que alimenta el componente Gallery. */
    gallery: z.string().optional(),
    /** Orden de aparición en los listados. */
    order: z.number().default(0),
  });

const productos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/productos" }),
  schema: baseSchema,
});

const servicios = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/servicios" }),
  schema: baseSchema,
});

export const collections = { productos, servicios };
