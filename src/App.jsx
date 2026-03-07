import { useState } from "react";
import { sendOtp, verifyOtp } from "./api";
import "./App.css";

function App() {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      alert("OTP sent");
      setStep(2);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp(email, otp);
      alert("Email verified");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container">

      <h2>Email OTP Verification</h2>

      {step === 1 && (
        <>
          <input
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button onClick={handleSendOtp}>
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button onClick={handleVerifyOtp}>
            Verify OTP
          </button>
        </>
      )}

    </div>
  );
}

export default App;
