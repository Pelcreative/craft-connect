import { z } from "zod";

export const createServiceRequestSchema = z.object({
  artisanId: z.string().uuid(),
  title: z.string().trim().min(3).max(160),
  message: z.string().trim().min(10).max(3000),
});

export const requestParamsSchema = z.object({
  requestId: z.string().uuid(),
});

export const updateRequestStatusSchema = z.object({
  status: z.enum(["accepted", "declined", "completed"]),
});
