import React, { useState } from "react";
import { auth } from "../firebase";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;

      // Refresh token to get claims
      const token = await user.getIdToken(true);
      const tokenResult = await user.getIdTokenResult();
      const role = tokenResult.claims.role;

      if (role === "admin") {
        window.location.href = "/admin-dashboard";
      } else if (role === "user") {
        window.location.href = "/user-dashboard";
      } else {
        alert("No role assigned yet.");
      }
    } catch (err) {
      console.error("OTP Verification failed:", err);
      alert("Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <input value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={verifyOtp}>Verify</button>
    </div>
  );
}
