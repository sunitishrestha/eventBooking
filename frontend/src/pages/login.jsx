import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // Store the token
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Successful");
      console.log(response.data);

      // Redirect based on role
      const role = response.data.user.role;
      if (role === "student") navigate("/student-dashboard");
      else if (role === "organizer") navigate("/organizer-dashboard");
      else if (role === "admin") navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      alert("Login Failed: " + (error.response?.data?.error || ""));
    }
  };

  return (
    <div className="auth-container">
      {" "}
      <div className="purple-overlay"></div>
      <div className="auth-box">
        {" "}
        <h2>Login</h2>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <label>Email*</label>{" "}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label>Password*</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register Here</a>
        </p>
        <p>
          Forgot password? <a href="/forgot-password">Click Here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
