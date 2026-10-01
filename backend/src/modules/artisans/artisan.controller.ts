import type { Request, Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.js";
import {
  artisanListQuerySchema,
  artisanParamsSchema,
  createArtisanProfileSchema,
} from "./artisan.schema.js";

import {
  createArtisanProfile,
  getArtisanById,
  getFeaturedArtisans,
  listArtisans,
} from "./artisan.service.js";


export async function createProfile(
  request: Request,
  response: Response,
) {
  const input = createArtisanProfileSchema.parse(request.body);

  const authenticatedRequest = request as AuthenticatedRequest;

  const artisan = await createArtisanProfile(
    authenticatedRequest.user.sub,
    input,
  );

  response.status(201).json({
    artisan,
  });
}

export async function list(
  request: Request,
  response: Response,
) {
  const filters = artisanListQuerySchema.parse(request.query);

  const artisans = await listArtisans(filters);

  response.status(200).json({
    artisans,
  });
}

export async function featured(
  _request: Request,
  response: Response,
) {
  const artisans = await getFeaturedArtisans();

  response.status(200).json({
    artisans,
  });
}

export async function getById(
  request: Request,
  response: Response,
) {
  const { artisanId } = artisanParamsSchema.parse(request.params);

  const artisan = await getArtisanById(artisanId);

  response.status(200).json({
    artisan,
  });
}