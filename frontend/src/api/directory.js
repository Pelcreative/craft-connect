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

export async function getArtisans(filters = {}) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value) query.set(key, value);
  }

  const suffix = query.size ? `?${query.toString()}` : "";
  const data = await getJson(`/artisans${suffix}`);
  return data.artisans;
}

export async function getArtisan(artisanId) {
  const data = await getJson(`/artisans/${artisanId}`);
  return data.artisan;
}
