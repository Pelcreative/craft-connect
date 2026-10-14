import type { Request, Response } from "express";

import type { AuthenticatedRequest } from "../../middleware/auth.js";
import {
  createServiceRequestSchema,
  requestParamsSchema,
  updateRequestStatusSchema,
} from "./request.schema.js";
import {
  createServiceRequest,
  getMyServiceRequests,
  updateServiceRequestStatus,
} from "./request.service.js";

export async function create(request: Request, response: Response) {
  const input = createServiceRequestSchema.parse(request.body);
  const authenticatedRequest = request as AuthenticatedRequest;

  const serviceRequest = await createServiceRequest(
    authenticatedRequest.user.sub,
    input,
  );

  response.status(201).json({ request: serviceRequest });
}

export async function listMine(request: Request, response: Response) {
  const authenticatedRequest = request as AuthenticatedRequest;
  const requests = await getMyServiceRequests(
    authenticatedRequest.user.sub,
    authenticatedRequest.user.role,
  );

  response.status(200).json({ requests });
}

export async function updateStatus(request: Request, response: Response) {
  const { requestId } = requestParamsSchema.parse(request.params);
  const { status } = updateRequestStatusSchema.parse(request.body);
  const authenticatedRequest = request as AuthenticatedRequest;

  const serviceRequest = await updateServiceRequestStatus(
    requestId,
    authenticatedRequest.user.sub,
    status,
  );

  response.status(200).json({ request: serviceRequest });
}
