import React, { useState, useEffect } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";


export default function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [authReady, setAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setAuthReady(true);
  }, []);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier && authReady) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",  // Attach reCAPTCHA to this DOM element
        {
          size: "invisible",  // Set the size to invisible
          callback: () => {
            console.log("reCAPTCHA solved");
          },
        },
        // Pass the Firebase auth instance here
      );
      window.recaptchaVerifier.render();
    }
  };

  const sendOtp = async () => {
    if (!authReady) {
      alert("Firebase auth is not ready yet. Please wait.");
      return;
    }

    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    setError("");  // Clear previous error
    setupRecaptcha();  // Setup reCAPTCHA

    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      window.confirmationResult = confirmation;
      alert("OTP Sent!");
      window.location.href = `/verify?phone=${encodeURIComponent(phone)}`;
    } catch (err) {
      console.error("OTP error:", err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  return (
    <div>
      <h2>Login via OTP</h2>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+91xxxxxxxxxx"
      />
      <div id="recaptcha-container"></div>  {/* reCAPTCHA will be rendered here */}
      <button onClick={sendOtp} disabled={isLoading}>
        {isLoading ? "Sending OTP..." : "Send OTP"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}  {/* Show error message */}
    </div>
  );
}
