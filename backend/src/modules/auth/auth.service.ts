import argon2 from "argon2";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { AppError } from "../../middleware/error-handler.js";

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: "client" | "artisan",
) {
  const normalizedEmail = email.toLowerCase();

  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1);

  if (existingUser.length > 0) {
    throw new AppError(409, "An account with this email already exists.");
  }

  const passwordHash = await argon2.hash(password);

  const [user] = await db
    .insert(users)
    .values({
      name,
      email: normalizedEmail,
      passwordHash,
      role,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    });

  return user;
}

export async function loginUser(
  email: string,
  password: string,
) {
  const normalizedEmail = email.toLowerCase();
  
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1);

  const user = result[0];

  if (!user) {
    throw new AppError(401, "Invalid email or password.");
  }

  const passwordValid = await argon2.verify(
    user.passwordHash,
    password,
  );

  if (!passwordValid) {
    throw new AppError(401, "Invalid email or password.");
  }

  const token = jwt.sign(
    {
      sub: user.id,
      role: user.role,
    },
    env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "15m",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}

export async function getCurrentUser(userId: string) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const user = result[0];

  if (!user) {
    throw new AppError(401, "User account no longer exists.");
  }

  return user;
}

