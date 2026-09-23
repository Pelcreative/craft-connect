import { Router, type Router as ExpressRouter } from "express";

import { register } from "./auth.controller.js";

export const authRouter: ExpressRouter = Router();

authRouter.post("/register", register);