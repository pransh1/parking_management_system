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
            <li>
              <a href="#"> Services </a>
            </li>
            <li>
              <a href="#"> About </a>
            </li>
            <li>
              <a href="#"> Contact </a>
            </li>
            <li>
              <a href="#"> Home </a>
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
              <a href="#"> Home </a>
            </li>
            <li>
              <a href="#"> Services </a>
            </li>
            <li>
              <a href="#"> About </a>
            </li>
            <li>
              <a href="#"> Contact </a>
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
