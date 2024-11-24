import React, { useState } from "react";
import axios from "axios";
import "../styles/SignIn.css";

const SignIn = () => {

  const [formData, setFormData] = useState({
    email:"",
    password:"",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccessMessage("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(response.status === 200) {
        setSuccessMessage("Login Successfully");
      }
      localStorage.setItem("token", response.data.token);

      window.location.href = "/";
    }
    catch(error) {
      if(error.response) {
        setError(error.response.data.message || "Login Failed");
      }
      else {
        setError("An error occured, Please try again");
      }
    }
  };
  
  return (
    <>
      <div class="wrapper sign-in">
        <a href="index.html">
          <span class="icon-close">
            <ion-icon name="close-outline"></ion-icon>
          </span>
        </a>
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div class="input-box">
            <span class="icon"><i class='bx bx-envelope'></i></span>
            <input type="email" name="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange}/>
              <label>Email</label>
          </div>
          <div class="input-box">
            <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
            <input type="password" name="password" placeholder="Enter your password" required value={formData.password} onChange={handleChange}/>
              <label>Phone Number</label>
          </div>
          <div class="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
          </div>
          <a href="dashboard.html">
            <button type="submit" className="btn">
              Sign In
            </button>
          </a>

          <div class="login-register">
            <p>Don't have a account?<a href="/signup" class="register-link">
              <button class="btn">Sign Up</button>
            </a>
            </p>
          </div>
        </form>  
      </div>
    </>
  );
};

export default SignIn;
