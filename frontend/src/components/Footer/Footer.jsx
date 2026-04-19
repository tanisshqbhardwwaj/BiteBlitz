import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1 className="logo">BiteBlitz</h1>
          <p>
            BiteBlitz is your one-stop destination for delicious meals delivered right to your doorstep. Explore a wide variety of dishes, enjoy a seamless ordering experience, and track your orders in real time. We are committed to quality, convenience, and customer satisfaction, making every meal memorable.
          </p>
          <div className="footer-social-icons">
            <img src={assets.linkedin_icon} alt="" href="https://www.linkedin.com/in/Tanishqbhardwaj/"/>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+919999999999</li>
            <li>Tanishqbhardwaj03@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 © BiteBlitz - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
