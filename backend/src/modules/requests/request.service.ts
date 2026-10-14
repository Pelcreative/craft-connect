import { desc, eq } from "drizzle-orm";

import { db } from "../../db/index.js";
import {
  artisanProfiles,
  serviceRequests,
  users,
} from "../../db/schema.js";
import { AppError } from "../../middleware/error-handler.js";

type CreateRequestInput = {
  artisanId: string;
  title: string;
  message: string;
};

type RequestStatus = "accepted" | "declined" | "completed";

export async function createServiceRequest(
  clientId: string,
  input: CreateRequestInput,
) {
  if (clientId === input.artisanId) {
    throw new AppError(400, "You cannot create a request for yourself.");
  }

  const [artisan] = await db
    .select({ userId: artisanProfiles.userId })
    .from(artisanProfiles)
    .where(eq(artisanProfiles.userId, input.artisanId))
    .limit(1);

  if (!artisan) {
    throw new AppError(404, "Artisan profile not found.");
  }

  const [request] = await db
    .insert(serviceRequests)
    .values({
      clientId,
      artisanId: input.artisanId,
      title: input.title,
      message: input.message,
    })
    .returning();

  if (!request) {
    throw new AppError(500, "Could not create service request.");
  }

  return request;
}

export async function getMyServiceRequests(
  userId: string,
  role: "client" | "artisan" | "admin",
) {
  if (role === "artisan") {
    return db
      .select({
        id: serviceRequests.id,
        title: serviceRequests.title,
        message: serviceRequests.message,
        status: serviceRequests.status,
        createdAt: serviceRequests.createdAt,
        updatedAt: serviceRequests.updatedAt,
        client: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(serviceRequests)
      .innerJoin(users, eq(serviceRequests.clientId, users.id))
      .where(eq(serviceRequests.artisanId, userId))
      .orderBy(desc(serviceRequests.createdAt));
  }

  return db
    .select({
      id: serviceRequests.id,
      title: serviceRequests.title,
      message: serviceRequests.message,
      status: serviceRequests.status,
      createdAt: serviceRequests.createdAt,
      updatedAt: serviceRequests.updatedAt,
      artisan: {
        id: users.id,
        name: users.name,
        businessName: artisanProfiles.businessName,
        city: artisanProfiles.city,
      },
    })
    .from(serviceRequests)
    .innerJoin(artisanProfiles, eq(serviceRequests.artisanId, artisanProfiles.userId))
    .innerJoin(users, eq(serviceRequests.artisanId, users.id))
    .where(eq(serviceRequests.clientId, userId))
    .orderBy(desc(serviceRequests.createdAt));
}

export async function updateServiceRequestStatus(
  requestId: string,
  artisanId: string,
  status: RequestStatus,
) {
  const [existing] = await db
    .select({
      artisanId: serviceRequests.artisanId,
      status: serviceRequests.status,
    })
    .from(serviceRequests)
    .where(eq(serviceRequests.id, requestId))
    .limit(1);

  if (!existing) {
    throw new AppError(404, "Service request not found.");
  }

  if (existing.artisanId !== artisanId) {
    throw new AppError(403, "You cannot update this service request.");
  }

  const canUpdate =
    (existing.status === "pending" && ["accepted", "declined"].includes(status)) ||
    (existing.status === "accepted" && status === "completed");

  if (!canUpdate) {
    throw new AppError(400, "This status change is not allowed.");
  }

  const [request] = await db
    .update(serviceRequests)
    .set({ status, updatedAt: new Date() })
    .where(eq(serviceRequests.id, requestId))
    .returning();

  if (!request) {
    throw new AppError(500, "Could not update service request.");
  }

  return request;
}
