const API_BASE = "https://emailft.vercel.app/api";

export async function sendOtp(email) {
  const res = await fetch(`${API_BASE}/v1.0.1/otp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Request-Id": crypto.randomUUID()
    },
    body: JSON.stringify({ email })
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  }

  return await res.text();
}

export async function verifyOtp(email, otp) {
  const res = await fetch(`${API_BASE}/v1.0.1/otp/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Request-Id": crypto.randomUUID()
    },
    body: JSON.stringify({ email, otp })
  });

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  }

  return await res.text();
}
