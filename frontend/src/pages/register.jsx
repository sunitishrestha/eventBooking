import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          full_name: form.full_name,
          email: form.email,
          phone_number: form.phone_number,
          password: form.password,
          role: form.role,
        }
      );

      alert("Registration Successful");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(
        "Registration Error:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="purple-overlay" />
      <div className="auth-box">
        <div className="logo">
          <img src="/logo.png" alt="Uni Events" height={38} />
        </div>
        <h2>Register Individual Account!</h2>
        <p className="subtitle">
          For the purpose of industry regulation, your details are required.
        </p>
        <form onSubmit={handleSubmit}>
          <label>Your fullName*</label>
          <input
            type="text"
            name="full_name"
            placeholder="Enter your full name"
            value={form.full_name}
            onChange={handleChange}
            required
          />
          <label>Your Email*</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Your Phone Number*</label>
          <input
            type="text"
            name="phone_number"
            placeholder="Enter your phone number"
            value={form.phone_number}
            onChange={handleChange}
            required
          />
          <label>Create Password* </label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label>Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <label>Select Role*</label>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>

          <div className="checkbox-row">
            <input type="checkbox" required />
            <span>I agree to terms & conditions</span>
          </div>
          <button className="auth-btn" type="submit">
            Register Account
          </button>
          <button
            type="button"
            className="google-btn"
            onClick={() => alert("Google registration not implemented")}
          >
            <img src="/google.png" alt="Google" className="google-logo" />
            Register with Google
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Click Here to Login</a>
        </p>
      </div>
    </div>
  );
}
export default Register;
