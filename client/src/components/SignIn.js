import React from "react";
import "../styles/SignIn.css";

const SignIn = () => {
  return (
    <>
      <div class="wrapper sign-in">
        <a href="index.html">
          <span class="icon-close">
            <ion-icon name="close-outline"></ion-icon>
          </span>
        </a>
        <h2>Sign In</h2>

        <div class="input-box">
          <span class="icon"><i class='bx bx-envelope'></i></span>
          <input type="email" required />
            <label>Email</label>
        </div>
        <div class="input-box">
          <span class="icon"><ion-icon name="call-outline"></ion-icon></span>
          <input type="tel" required />
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
          <p>Don't have a account?<a href="" class="register-link">
            <button class="btn">Sign Up</button>
          </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
