import type { Request, Response } from "express";

import { registerSchema } from "./auth.schema.js";
import { registerUser } from "./auth.service.js";

export async function register(
  request: Request,
  response: Response,
) {
  const input = registerSchema.parse(request.body);

  const user = await registerUser(
    input.name,
    input.email,
    input.password,
  );

  response.status(201).json({
    user,
  });
}