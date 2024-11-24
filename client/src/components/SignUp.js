import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      setError("please select a role");
    }

    try {
      const response = await axios.post("/api/register", formData, {
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 201) {
        setSuccessMessage("Registered Successfully");
        setFormData({
          username: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "",
        });
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Registeration failed");
      } else {
        setError("An error occured. Please try again");
      }
    }
  };

  return (
    <>
      <div class="wrapper register">
        <a href="index.html">
          <span class="icon-close">
            <ion-icon name="close-outline"></ion-icon>
          </span>
        </a>

        <h2>Registration</h2>
        {error && <p class="error-message">{error}</p>}
        {successMessage && <p class="success-message">{successMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div class="input-box">
            <span class="icon">
              <i class="bx bx-user"></i>
            </span>
            <input
              type="text"
              name="username"
              placeholder="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <label>Username</label>
          </div>
          <div class="input-box">
            <span class="icon">
              <i class="bx bx-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>
          <div class="input-box">
            <span class="icon">
              <ion-icon name="call-outline"></ion-icon>
            </span>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="phone Number"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <label>Phone Number</label>
          </div>
          <div class="input-box">
            <span class="icon">
              <ion-icon name="lock-closed-outline"></ion-icon>
            </span>
            <input
              type="password"
              name="password"
              placeholder="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>
          <div className="role-selection">
            <h3>Select Role</h3>
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                onChange={handleChange}
                checked={formData.role === "user"}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                onChange={handleChange}
                checked={formData.role === "admin"}
              />
              Admin
            </label>
          </div>
          <br />
          <div class="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
          </div>
          <a href="login.html">
            <button type="submit" class="btn">
              Register
            </button>
          </a>
          <div class="login-register">
            <p>
              Already have an account?
              <a href="/signin" class="register-link">
                <button class="btn">Sign In</button>
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
