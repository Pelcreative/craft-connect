import { Router, type Router as ExpressRouter } from "express";

import { requireAuth } from "../../middleware/auth.js";
import { requireRole } from "../../middleware/authorize.js";
import {
  login,
  me,
  register,
  resendVerification,
  verify,
} from "./auth.controller.js";

export const authRouter: ExpressRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/verify-email", verify);
authRouter.post("/resend-verification", resendVerification);

authRouter.get("/me", requireAuth, me);

authRouter.get(
  "/admin-test",
  requireAuth,
  requireRole("admin"),
  (_request, response) => {
    response.json({ message: "You are an admin." });
  },
);