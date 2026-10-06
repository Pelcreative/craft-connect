import { createHash, randomBytes } from "node:crypto";

import argon2 from "argon2";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

import { resend } from "../../config/email.js";
import { env } from "../../config/env.js";
import { db } from "../../db/index.js";
import {
  emailVerificationTokens,
  users,
} from "../../db/schema.js";
import { AppError } from "../../middleware/error-handler.js";

const verificationTokenLifetimeMs = 24 * 60 * 60 * 1000;

function hashVerificationToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function sendVerificationEmail(user: {
  id: string;
  email: string;
}) {
  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = hashVerificationToken(rawToken);
  const expiresAt = new Date(Date.now() + verificationTokenLifetimeMs);

  await db.transaction(async (transaction) => {
    await transaction
      .delete(emailVerificationTokens)
      .where(eq(emailVerificationTokens.userId, user.id));

    await transaction.insert(emailVerificationTokens).values({
      tokenHash,
      userId: user.id,
      expiresAt,
    });
  });

  const verificationUrl =
    `${env.APP_URL}/verify-email?token=${rawToken}`;

  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: [user.email],
    subject: "Verify your CraftConnect email",
    html: `
      <h1>Verify your email</h1>
      <p>Click the link below to activate your CraftConnect account.</p>
      <p>
        <a href="${verificationUrl}">
          Verify my email
        </a>
      </p>
      <p>This link expires in 24 hours.</p>
    `,
  });

  if (error) {
    throw new AppError(
      502,
      "We could not send the verification email. Please try again.",
    );
  }
}

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

  if (!user) {
    throw new AppError(500, "Could not create your account.");
  }

  await sendVerificationEmail(user);

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

  if (!user.emailVerifiedAt) {
    throw new AppError(
      403,
      "Verify your email before logging in.",
    );
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

export async function verifyEmail(token: string) {
  const tokenHash = hashVerificationToken(token);

  const result = await db
    .select({
      userId: emailVerificationTokens.userId,
      expiresAt: emailVerificationTokens.expiresAt,
    })
    .from(emailVerificationTokens)
    .where(eq(emailVerificationTokens.tokenHash, tokenHash))
    .limit(1);

  const verificationToken = result[0];

  if (
    !verificationToken ||
    verificationToken.expiresAt.getTime() < Date.now()
  ) {
    throw new AppError(
      400,
      "This verification link is invalid or has expired.",
    );
  }

  await db.transaction(async (transaction) => {
    await transaction
      .update(users)
      .set({
        emailVerifiedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, verificationToken.userId));

    await transaction
      .delete(emailVerificationTokens)
      .where(
        eq(
          emailVerificationTokens.userId,
          verificationToken.userId,
        ),
      );
  });
}

export async function resendVerificationEmail(email: string) {
  const normalizedEmail = email.toLowerCase();

  const result = await db
    .select({
      id: users.id,
      email: users.email,
      emailVerifiedAt: users.emailVerifiedAt,
    })
    .from(users)
    .where(eq(users.email, normalizedEmail))
    .limit(1);

  const user = result[0];

  if (!user || user.emailVerifiedAt) {
    return;
  }

  await sendVerificationEmail(user);
}

export async function getCurrentUser(userId: string) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      emailVerifiedAt: users.emailVerifiedAt,
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