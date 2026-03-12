import { useState } from "react";
import { sendOtp, verifyOtp } from "./api"; // assuming this file exists
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    // Optional: basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      await sendOtp(email.trim());
      setLoading(false);
      setStep(2);
      setError("");
    } catch (err) {
      setLoading(false);
      setError(err.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    setError("");

    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      await verifyOtp(email, otp.trim());
      setLoading(false);
      setVerified(true);

      // Auto-reset after success
      setTimeout(() => {
        setVerified(false);
        setOtp("");
        setEmail("");
        setStep(1);
        setError("");
      }, 2200);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Invalid or expired OTP");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h2>Email OTP Verification</h2>

        {verified && (
          <div className="success-message">✔ Email Verified Successfully!</div>
        )}

        {step === 1 && (
          <div className="form-step">
            {error && <div className="error-message">{error}</div>}

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(""); // live clear on typing
              }}
              disabled={loading}
              className={error ? "input-error" : ""}
            />

            <button
              onClick={handleSendOtp}
              disabled={loading || verified}
              className="send-btn"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            {error && <div className="error-message">{error}</div>}

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                if (error) setError("");
              }}
              disabled={loading}
              className={error ? "input-error" : ""}
              maxLength={6} // most OTPs are 4–6 digits
            />

            <button
              onClick={handleVerifyOtp}
              disabled={loading || verified}
              className="verify-btn"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Optional: resend link */}
            <div className="resend-link">
              Didn't receive OTP?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={handleSendOtp}
                disabled={loading}
              >
                Resend
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
