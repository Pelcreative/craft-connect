import { z } from "zod";

export const createArtisanProfileSchema = z.object({
  businessName: z.string().trim().min(2).max(160),
  bio: z.string().trim().max(2000).optional(),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().min(2).max(100).optional(),
  profileImageUrl: z.string().url().optional(),
  categoryIds: z.array(z.string().uuid()).min(1).max(5),
});

export const artisanListQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  city: z.string().trim().max(100).optional(),
  category: z.string().trim().max(120).optional(),
});

export const artisanParamsSchema = z.object({
  artisanId: z.string().uuid(),
});