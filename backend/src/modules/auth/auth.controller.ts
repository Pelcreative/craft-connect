import type { Request, Response } from "express";

import { registerSchema, loginSchema } from "./auth.schema.js";
import { registerUser, loginUser, getCurrentUser } from "./auth.service.js";
import type { AuthenticatedRequest } from "../../middleware/auth.js";

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

export async function me(
  request: Request,
  response: Response,
) {
  const authenticatedRequest =
    request as AuthenticatedRequest;

  const user = await getCurrentUser(
    authenticatedRequest.user.sub,
  );

  response.status(200).json({
    user,
  });
}