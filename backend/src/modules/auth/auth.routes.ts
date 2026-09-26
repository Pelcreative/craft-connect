import { Router, type Router as ExpressRouter } from "express";

import {
  register,
  login,
  me,
} from "./auth.controller.js";

import { requireAuth } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/authorize.js";

export const authRouter: ExpressRouter = Router();


authRouter.get(
  "/admin-test",
  requireAuth,
  requireRole("admin"),
  (_request, response) => {
    response.json({
      message: "You are an admin.",
    });
  },
);

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", requireAuth, me);