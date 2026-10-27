const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function getAccessToken() {
  return localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
}

async function request(path, options = {}) {
  const token = getAccessToken();
  if (!token) throw new Error("Please log in to continue.");

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Something went wrong.");
  return data;
}

export async function getMyArtisanProfile() {
  const data = await request("/artisans/profile/me");
  return data.artisan;
}

export async function saveArtisanProfile(input, isNew) {
  const payload = {
    ...input,
    bio: input.bio || undefined,
    state: input.state || undefined,
    profileImageUrl: input.profileImageUrl || undefined,
  };

  const data = await request("/artisans/profile", {
    method: isNew ? "POST" : "PATCH",
    body: JSON.stringify(payload),
  });
  return data.artisan;
}
