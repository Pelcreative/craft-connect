import type { NextFunction, Request, Response } from "express";

import { AppError } from "./error-handler.js";
import type { AuthenticatedRequest } from "./auth.js";

type Role = "client" | "artisan" | "admin";

export function requireRole(...allowedRoles: Role[]) {
  return (
    request: Request,
    _response: Response,
    next: NextFunction,
  ) => {
    const authenticatedRequest =
      request as AuthenticatedRequest;

    if (!authenticatedRequest.user) {
      return next(
        new AppError(401, "Authentication required."),
      );
    }

    if (!allowedRoles.includes(authenticatedRequest.user.role)) {
      return next(
        new AppError(403, "You do not have permission to perform this action."),
      );
    }

    next();
  };
}