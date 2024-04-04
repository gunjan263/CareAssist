import React from "react";
import { useState, useEffect } from "react";
import "./About.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 500); 
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div id="about" className="about-section-container">
      <div className="about-primary-subheading">WHO WE ARE</div>
      <div
        className={`about-background-image-container ${
          isVisible ? "visible" : ""
        }`}
      >
       
      </div>
      <div className="about-section-text-container">
        <h1 className="primary-heading">
          At AssistCare, our mission is to provide comprehensive and affordable
          health insurance solutions
        </h1>
        <p className="about-primary-text">
          We believe in the importance of preventative care and wellness
          promotion.
        </p>
        <p className="about-primary-text">
          With a team of experienced professionals and a commitment to
          excellence, we have earned a reputation for reliability, transparency,
          and superior customer service.
        </p>
        
      </div>
    </div>
  );
};

export default About;
