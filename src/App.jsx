import { useState } from "react";
import { sendOtp, verifyOtp } from "./api";
import "./App.css";

function App() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await sendOtp(email);
      setLoading(false);
      setStep(2);
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      await verifyOtp(email, otp);
      setLoading(false);

      setVerified(true);

      setTimeout(() => {
        setVerified(false);
        setOtp("");
        setEmail("");
        setStep(1);
      }, 2000);

    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <div className="page">

      <div className="container">

        <h2>Email OTP Verification</h2>

        {verified && (
          <div className="success">
            ✔ Email Verified Successfully
          </div>
        )}

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
