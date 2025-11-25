import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function VerifyCode() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/verify-code", {
        email,
        code,
      });
      setMessage("Code verified! Now you can reset your password.");
      console.log(res.data);
    } catch (error) {
      setMessage("Invalid Code");
    }
  };

  return (
    <div className="auth-container">
      <div className="purple-overlay"></div>
      <div className="auth-box">
        <h2>Verify Code</h2>

        <form onSubmit={handleVerify}>
          <label>Email*</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Verification Code*</label>
          <input
            type="text"
            maxLength="4"
            placeholder="Enter Code"
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button className="auth-btn" type="submit">
            Verify
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default VerifyCode;
