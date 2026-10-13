import type { Request, Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.js";
import {
  loginSchema,
  registerSchema,
  resendVerificationSchema,
  verifyEmailSchema,
} from "./auth.schema.js";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  resendVerificationEmail,
  verifyEmail,
} from "./auth.service.js";

export async function register(
  request: Request,
  response: Response,
) {
  const input = registerSchema.parse(request.body);

  const user = await registerUser(
    input.name,
    input.email,
    input.password,
    input.role,
  );

  response.status(201).json({
    message: "Account created. Check your email to verify it.",
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

export async function verify(
  request: Request,
  response: Response,
) {
  const { token } = verifyEmailSchema.parse(request.body);

  await verifyEmail(token);

  response.status(200).json({
    message: "Email verified. You can now log in.",
  });
}

export async function resendVerification(
  request: Request,
  response: Response,
) {
  const { email } = resendVerificationSchema.parse(request.body);

  await resendVerificationEmail(email);

  response.status(200).json({
    message:
      "If an unverified account exists, a verification email was sent.",
  });
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

  response.status(200).json({ user });
}