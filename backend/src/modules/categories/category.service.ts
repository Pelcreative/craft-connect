import { asc } from "drizzle-orm";

import { db } from "../../db/index.js";
import { categories } from "../../db/schema.js";

export async function getCategories() {
  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
    })
    .from(categories)
    .orderBy(asc(categories.name));
}