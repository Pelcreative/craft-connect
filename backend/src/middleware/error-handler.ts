import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const notFound: RequestHandler = (request, _response, next) => {
  next(
    new AppError(
      404,
      `Route ${request.method} ${request.originalUrl} was not found.`,
    ),
  );
};

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  _next,
) => {
  if (error instanceof ZodError) {
    response.status(400).json({
      message: "Validation failed.",
      errors: error.flatten().fieldErrors,
    });

    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      message: error.message,
    });

    return;
  }

  console.error(error);

  response.status(500).json({
    message: "An unexpected error occurred.",
  });
};