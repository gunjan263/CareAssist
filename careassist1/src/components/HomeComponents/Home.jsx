import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Home.css";
import About from "../AboutComponents/About";

const Home = () => {
  return (
    <div id="home" className="home-container">
      <div className="home-text-section">
        <h1 className="home-primary-heading">Buy Insurance in a Smart Way</h1>
        <p className="home-primary-text">
          Health insurance can be tricky. Finding the right protection does not
          have to be. Insurance can help you.
        </p>
        <Link to="/register" className="home-secondary-button">
          Sign Up <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Home;
