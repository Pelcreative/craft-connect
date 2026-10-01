import { eq, inArray } from "drizzle-orm";

import { db } from "../../db/index.js";
import {
  artisanCategories,
  artisanProfiles,
  categories,
  users, 
} from "../../db/schema.js";
import { AppError } from "../../middleware/error-handler.js";

type ProfileInput = {
  businessName: string;
  bio?: string | undefined;
  city: string;
  state?: string | undefined;
  profileImageUrl?: string | undefined;
  categoryIds: string[];
};

type ArtisanCategory = {
  id: string;
  name: string;
  slug: string;
};

type PublicArtisan = {
  id: string;
  name: string;
  businessName: string;
  bio: string | null;
  city: string;
  state: string | null;
  profileImageUrl: string | null;
  isVerified: boolean;
  averageRating: number;
  reviewCount: number;
  categories: ArtisanCategory[];
};

export async function createArtisanProfile(
  userId: string,
  input: ProfileInput,
) {
  const existingProfile = await db
    .select({ userId: artisanProfiles.userId })
    .from(artisanProfiles)
    .where(eq(artisanProfiles.userId, userId))
    .limit(1);

  if (existingProfile.length > 0) {
    throw new AppError(409, "You already have an artisan profile.");
  }

  const uniqueCategoryIds = [...new Set(input.categoryIds)];

  const validCategories = await db
    .select({ id: categories.id })
    .from(categories)
    .where(inArray(categories.id, uniqueCategoryIds));

  if (validCategories.length !== uniqueCategoryIds.length) {
    throw new AppError(400, "One or more category IDs are invalid.");
  }

  return db.transaction(async (transaction) => {
    const [profile] = await transaction
      .insert(artisanProfiles)
      .values({
        userId,
        businessName: input.businessName,
        bio: input.bio,
        city: input.city,
        state: input.state,
        profileImageUrl: input.profileImageUrl,
      })
      .returning();

    if (!profile) {
      throw new AppError(500, "Could not create artisan profile.");
    }

    await transaction.insert(artisanCategories).values(
      uniqueCategoryIds.map((categoryId) => ({
        artisanId: userId,
        categoryId,
      })),
    );

    return {
      ...profile,
      categoryIds: uniqueCategoryIds,
    };
  });
}

export async function listArtisans(filters: {
  search?: string | undefined;
  city?: string | undefined;
  category?: string | undefined ;
}) {
  const rows = await db
    .select({
      id: users.id,
      name: users.name,
      businessName: artisanProfiles.businessName,
      bio: artisanProfiles.bio,
      city: artisanProfiles.city,
      state: artisanProfiles.state,
      profileImageUrl: artisanProfiles.profileImageUrl,
      isVerified: artisanProfiles.isVerified,
      averageRating: artisanProfiles.averageRating,
      reviewCount: artisanProfiles.reviewCount,
      categoryId: categories.id,
      categoryName: categories.name,
      categorySlug: categories.slug,
    })
    .from(artisanProfiles)
    .innerJoin(users, eq(artisanProfiles.userId, users.id))
    .innerJoin(
      artisanCategories,
      eq(artisanCategories.artisanId, artisanProfiles.userId),
    )
    .innerJoin(
      categories,
      eq(artisanCategories.categoryId, categories.id),
    );

  const grouped = new Map<string, PublicArtisan>();

  for (const row of rows) {
    const existing = grouped.get(row.id);

    const category = {
      id: row.categoryId,
      name: row.categoryName,
      slug: row.categorySlug,
    };

    if (existing) {
      existing.categories.push(category);
      continue;
    }

    grouped.set(row.id, {
      id: row.id,
      name: row.name,
      businessName: row.businessName,
      bio: row.bio,
      city: row.city,
      state: row.state,
      profileImageUrl: row.profileImageUrl,
      isVerified: row.isVerified,
      averageRating: row.averageRating,
      reviewCount: row.reviewCount,
      categories: [category],
    });
  }

  const search = filters.search?.toLowerCase();
  const city = filters.city?.toLowerCase();
  const category = filters.category?.toLowerCase();

  return [...grouped.values()].filter((artisan) => {
    const matchesSearch =
      !search ||
      artisan.businessName.toLowerCase().includes(search) ||
      artisan.name.toLowerCase().includes(search) ||
      artisan.categories.some((item) =>
        item.name.toLowerCase().includes(search),
      );

    const matchesCity =
      !city || artisan.city.toLowerCase().includes(city);

    const matchesCategory =
      !category ||
      artisan.categories.some(
        (item) =>
          item.slug.toLowerCase() === category ||
          item.name.toLowerCase().includes(category),
      );

    return matchesSearch && matchesCity && matchesCategory;
  });
}

export async function getFeaturedArtisans() {
  const artisans = await listArtisans({});

  return artisans
    .sort(
      (first, second) =>
        Number(second.isVerified) - Number(first.isVerified) ||
        second.averageRating - first.averageRating,
    )
    .slice(0, 6);
}

export async function getArtisanById(artisanId: string) {
  const artisans = await listArtisans({});

  const artisan = artisans.find((item) => item.id === artisanId);

  if (!artisan) {
    throw new AppError(404, "Artisan profile not found.");
  }

  return artisan;
}