import { useState } from "react";
import { sendOtp, verifyOtp } from "./api";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // ← for popup/error feedback

  const handleSendOtp = async () => {
    // Reset previous error
    setErrorMessage("");

    // Basic validation
    if (!email.trim()) {
      setErrorMessage("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      await sendOtp(email.trim()); // .trim() is good practice
      setLoading(false);
      setStep(2);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    setErrorMessage("");

    if (!otp.trim()) {
      setErrorMessage("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      await verifyOtp(email, otp.trim());
      setLoading(false);
      setVerified(true);

      // Reset form after success
      setTimeout(() => {
        setVerified(false);
        setOtp("");
        setEmail("");
        setStep(1);
        setErrorMessage("");
      }, 2200);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h2>Email OTP Verification</h2>

        {verified && (
          <div className="success">✔ Email Verified Successfully</div>
        )}

        {/* Error popup / message */}
        {errorMessage && (
          <div className="error-popup">
            <div className="error-content">
              <span className="error-icon">!</span>
              <p>{errorMessage}</p>
              <button
                className="close-btn"
                onClick={() => setErrorMessage("")}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button onClick={handleSendOtp} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />
            <button onClick={handleVerifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
