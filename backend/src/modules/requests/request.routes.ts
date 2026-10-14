import { Router, type Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/authorize.js";
import { create, listMine, updateStatus } from "./request.controller.js";

export const requestsRouter: ExpressRouter = Router();

requestsRouter.post("/", requireAuth, requireRole("client"), create);
requestsRouter.get("/mine", requireAuth, listMine);
requestsRouter.patch(
  "/:requestId/status",
  requireAuth,
  requireRole("artisan"),
  updateStatus,
);
