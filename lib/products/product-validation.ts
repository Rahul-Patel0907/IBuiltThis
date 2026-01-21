import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(128, "Name must be at most 128 characters long"),
    slug: z.string().max(128, "Slug must be at most 128 characters long").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and contains only letters and numbers and hypens"),
    tagline: z.string().max(200, "Tagline must be at most 200 characters long"),
    description: z.string().optional(),
    websiteUrl: z.string().min(7, "Website URL must be at least 7 characters long").max(256, "Website URL must be at most 256 characters long").url("Website URL must be a valid URL"),
    tags: z.string().min(1, "Tags are required").transform((val) => val.split(",").map((tag) => tag.trim().toLowerCase())),
});