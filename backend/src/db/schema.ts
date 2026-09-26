import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  primaryKey,
  real,
  boolean,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", [
  "client",
  "artisan",
  "admin",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRole("role").default("client").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const artisanProfiles = pgTable("artisan_profiles", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),

  businessName: varchar("business_name", { length: 160 }).notNull(),
  bio: text("bio"),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }),
  profileImageUrl: text("profile_image_url"),

  isVerified: boolean("is_verified").default(false).notNull(),
  averageRating: real("average_rating").default(0).notNull(),
  reviewCount: integer("review_count").default(0).notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const artisanCategories = pgTable(
  "artisan_categories",
  {
    artisanId: uuid("artisan_id")
      .notNull()
      .references(() => artisanProfiles.userId, { onDelete: "cascade" }),

    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.artisanId, table.categoryId],
    }),
  ],
);