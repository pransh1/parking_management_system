import React from "react";
import "../styles/SignUp.css";

const SignUp = () => {


  
  return (
    <>
      <div class="wrapper register">
        <a href="index.html"><span class="icon-close"><ion-icon name="close-outline"></ion-icon></span></a>

        <h2>Registration</h2>

        <div class="input-box">
          <span class="icon"><i class='bx bx-user'></i></span>
          <input type="text" required />
            <label>Username</label>
        </div>

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
        <div class="input-box">
          <span class="icon"><ion-icon name="lock-closed-outline"></ion-icon></span>
          <input type="password" required />
            <label>Password</label>
        </div>
        <div className="role-selection">
          <h3>Select Role</h3>
          <label>
            <input type="radio" name="role" value="user" /> User
          </label>
          <label>
            <input type="radio" name="role" value="admin" /> Admin
          </label>
        </div>
        <br/>
        <div class="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
        </div>
        <a href="login.html"><button type="submit" class="btn">Register</button></a>
        <div class="login-register">
          <p>Already have an account?<a href="" class="register-link"><button class="btn">Sign In</button>

          </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default SignUp;
