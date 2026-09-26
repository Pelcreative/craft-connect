import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { AppError } from "./error-handler.js";

type AuthTokenPayload = {
  sub: string;
  role: "client" | "artisan" | "admin";
};

export interface AuthenticatedRequest extends Request {
  user: AuthTokenPayload;
}

export function requireAuth(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return next(new AppError(401, "Authentication required."));
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new AppError(401, "Invalid authorization header."));
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (
      typeof payload !== "object" ||
      typeof payload.sub !== "string" ||
      !["client", "artisan", "admin"].includes(String(payload.role))
    ) {
      return next(new AppError(401, "Invalid authentication token."));
    }

    (request as AuthenticatedRequest).user = {
      sub: payload.sub,
      role: payload.role as AuthTokenPayload["role"],
    };

    next();
  } catch {
    next(new AppError(401, "Invalid or expired authentication token."));
  }
}