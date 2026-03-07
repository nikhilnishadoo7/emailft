const API_BASE = "/api/email";

async function handleResponse(res) {
  const contentType = res.headers.get("content-type");

  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const message = data?.message || data || "Something went wrong";
    throw new Error(message);
  }

  return data;
}

export async function sendOtp(email) {
  const res = await fetch(`${API_BASE}/v1.0.1/otp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Request-Id": crypto.randomUUID()
    },
    body: JSON.stringify({ email })
  });

  return handleResponse(res);
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

  return handleResponse(res);
}
