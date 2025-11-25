import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/reset-password", {
        email,
        newPassword,
      });

      setMessage("Password updated successfully!");
      console.log(res.data);
    } catch (err) {
      setMessage("Failed to update password.");
    }
  };

  return (
    <div className="auth-container">
      {" "}
      <div className="purple-overlay"></div>
      <div className="auth-box">
        {" "}
        <h2>Reset Password</h2>
        <form onSubmit={handleReset}>
          <label>Email*</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>New Password*</label>
          <input
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit">
            Reset Password
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default ResetPassword;
