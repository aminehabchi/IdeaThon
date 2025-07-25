import { toast } from "sonner";

export function imageToBase64(file) {
  return new Promise((resolve) => {
    if (!file) {
      return resolve(""); // return empty string if no file
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result); // base64 string (data URL)
    };

    reader.onerror = () => {
      resolve(""); // return empty string on error
    };

    reader.readAsDataURL(file);
  });
}

export async function fetcher({
  url,
  method = "GET",
  data = null,
  token = null,
  returned_status = 200,
}) {
  if (!url) throw new Error("fetcher: URL is required");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
    credentials: "include",
  };

  if (data && method !== "GET") {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    // Handle 401 Unauthorized globally
    if (response.status === 401 && typeof window !== "undefined") {
      window.location.href = "/login"; // or use Router.push if in React component
      return; // prevent further execution
    }

    // If status doesn't match expected, throw error
    if (response.status !== returned_status) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch (e) {
        // no JSON in response
      }
      const message =
        errorData?.message ||
        `Expected status ${returned_status}, got ${response.status}`;
      throw new Error(message);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return null;
  } catch (err) {
    toast.error(err.message);
    throw err;
  }
}

export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past; // difference in milliseconds

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}


