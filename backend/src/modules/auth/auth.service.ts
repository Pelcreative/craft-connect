import argon2 from "argon2";
import { eq } from "drizzle-orm";

import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { AppError } from "../../middleware/error-handler.js";

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new AppError(409, "An account with this email already exists.");
  }

  const passwordHash = await argon2.hash(password);

  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      passwordHash,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    });

  return user;
}