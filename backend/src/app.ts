import cors from "cors";
import express, { type Express } from "express";

import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/error-handler.js";

export const app: Express = express();

app.disable("x-powered-by");
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_request, response) => {
  response.status(200).json({
    status: "ok",
    service: "craft-connect-api",
  });
});

app.use(notFound);
app.use(errorHandler);
