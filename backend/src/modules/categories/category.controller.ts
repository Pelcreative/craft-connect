import type { Request, Response } from "express";

import { getCategories } from "./category.service.js";

export async function listCategories(
  _request: Request,
  response: Response,
) {
  const categories = await getCategories();

  response.status(200).json({
    categories,
  });
}