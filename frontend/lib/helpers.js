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
  returned_status = 200, // expected response status
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
    credentials: "include", // send cookies if needed
  };

  if (data && method !== "GET") {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

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

    // If response has a body, try to return it as JSON
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    // No JSON body (e.g., DELETE 204 No Content)
    return null;
  } catch (err) {
    toast.error(err.message);
    // console.error("Fetcher error:", err.message);
    throw err;
  }
}
