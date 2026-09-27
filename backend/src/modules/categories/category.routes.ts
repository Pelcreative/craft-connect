import { Router, type Router as ExpressRouter } from "express";

import { listCategories } from "./category.controller.js";

export const categoriesRouter: ExpressRouter = Router();

categoriesRouter.get("/", listCategories);