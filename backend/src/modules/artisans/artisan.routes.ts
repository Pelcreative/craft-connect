import { Router, type Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/authorize.js";
import {
  createProfile,
  featured,
  getById,
  list,
} from "./artisan.controller.js";

export const artisansRouter: ExpressRouter = Router();

artisansRouter.get("/", list);
artisansRouter.get("/featured", featured);

artisansRouter.post(
  "/profile",
  requireAuth,
  requireRole("artisan"),
  createProfile,
);

artisansRouter.get("/:artisanId", getById);