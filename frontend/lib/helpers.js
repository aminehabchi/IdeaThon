export async function fetcher({
  url,
  method = "GET",
  data = null,
  token = null,
  returned_status = 200,
}) {
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
    credentials: "include", // important for sending cookies
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, config);

    if (res.status !== returned_status) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Unexpected status: ${res.status}`);
    }

    if (returned_status !== 200) {
      return; // no body expected
    }

    return await res.json();
  } catch (err) {
    console.error("API Error:", err.message);
    throw err;
  }
}
