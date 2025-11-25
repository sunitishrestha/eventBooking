import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "[http://localhost:5000/forgot-password](http://localhost:5000/forgot-password)",
        {
          email,
        }
      );

      setMessage("Code sent to your email/phone.");
      console.log(response.data);
    } catch (error) {
      setMessage("Failed: " + (error.response?.data?.error || ""));
    }
  };

  return (
    <div className="auth-container">
      {" "}
      <div className="purple-overlay"></div>
      <div className="auth-box">
        {" "}
        <h2>Forgot Password</h2>
        <form onSubmit={handleSendCode}>
          <label>Email*</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit">
            Send Code
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ForgotPassword;
