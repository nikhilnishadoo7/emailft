export async function sendOtp(email) {
  const res = await fetch("/api/v1.0.1/otp/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Request-Id": crypto.randomUUID()
    },
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.json();
}

export async function verifyOtp(email, otp) {
  const res = await fetch("/api/v1.0.1/otp/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Request-Id": crypto.randomUUID()
    },
    body: JSON.stringify({ email, otp })
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.json();
}