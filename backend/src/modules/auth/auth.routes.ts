import { Router, type Router as ExpressRouter } from "express";

import { register, login } from "./auth.controller.js";

export const authRouter: ExpressRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);