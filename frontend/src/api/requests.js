const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function getAccessToken() {
  return (
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("token")
  );
}

async function request(path, options = {}) {
  const token = getAccessToken();

  if (!token) {
    throw new Error("Please log in to continue.");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data;
}

export async function createServiceRequest(input) {
  const data = await request("/requests", {
    method: "POST",
    body: JSON.stringify(input),
  });

  return data.request;
}

export async function getMyServiceRequests() {
  const data = await request("/requests/mine");
  return data.requests;
}

export async function updateServiceRequestStatus(requestId, status) {
  const data = await request(`/requests/${requestId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return data.request;
}
