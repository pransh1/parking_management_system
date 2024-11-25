import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
    </div>
  );
};

const Navbar = () => {
  return (
    <>
      <div class="navbar">
        <div class="nav-logo">
          <a href="#">Logo</a>
        </div>
        <div class="nav-items">
          <ul>
            <li>
              <Link to="/"> Home </Link>
            </li>
            <Link to="/parking-spaces">Parking Slots</Link>
            <li>
              <Link to="/wallet">Wallet</Link>
            </li>
            <li>
              <Link to="/my-account">My Account</Link>
            </li>
          </ul>
        </div>
        <div class="nav-button">
          <div class="anim-layer"></div>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div id="hamburger-menu">&#9776;</div>
      </div>

      <div id="mobile-menu">
        <div class="mobile-nav-items">
          <ul>
            <li>
            <Link to="/"> Home </Link>
            </li>
            <li>
            <Link to="/parking-spaces">Parking Slots</Link>
            </li>
            <li>
            <Link to="/wallet">Wallet</Link>
            </li>
            <li>
            <Link to="/my-account">My Account</Link>
            </li>
          </ul>
        </div>
        <div class="mobile-nav-button">
          <div class="anim-layer"></div>
          <Link to="/signup">Sign Up</Link>
        </div>
        <div id="hamburger-cross">&#10006;</div>
      </div>
    </>
  );
};

export { Navbar, Home };
