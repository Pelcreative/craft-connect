import type { Request, Response } from "express";

import { registerSchema, loginSchema } from "./auth.schema.js";
import { registerUser, loginUser } from "./auth.service.js";

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

export async function login(
  request: Request,
  response: Response,
) {
  const input = loginSchema.parse(request.body);

  const result = await loginUser(
    input.email,
    input.password,
  );

  response.status(200).json(result);
}