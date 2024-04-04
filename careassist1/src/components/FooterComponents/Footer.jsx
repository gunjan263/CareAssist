import React from "react";
import "./Footer.css";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <p>Care Assist</p>
        </div>
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>
            <a href="/">Home</a>
          </span>
          <span>
            <a href="/about">About</a>
          </span>
          <span>
            <a href="/work">Work</a>
          </span>
          <span>
            <a href="/testimonial">Testimonials</a>
          </span>
        </div>
        <div className="footer-section-columns">
          <span>
            <a href="/contact">Contact</a>
          </span>
          <span>703-299-0608</span>
          <span>assitcare13@gmail.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
          <span>&copy; 2024 Your Company. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
