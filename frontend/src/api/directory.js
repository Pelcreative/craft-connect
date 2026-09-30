const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function getJson(path) {
  const response = await fetch(`${API_URL}${path}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not load data.");
  }

  return data;
}

export async function getFeaturedArtisans() {
  const data = await getJson("/artisans/featured");
  return data.artisans;
}

export async function getCategories() {
  const data = await getJson("/categories");
  return data.categories;
}