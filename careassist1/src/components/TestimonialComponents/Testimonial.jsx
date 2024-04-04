import React, { useState, useEffect } from "react";
import ProfilePic from "../../assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";
import "./Testimonial.css";

const Testimonial = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Use useEffect to toggle visibility when the component mounts
  useEffect(() => {
    // Example: setTimeout to toggle visibility after 500 milliseconds
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Adjust delay as needed

    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array to run only on mount

  return (
    <div id="testimonial" className="testimonial-section-wrapper">
      <div className="testimonial-section-top">
        <h1 className="primary-heading">What They Are Saying</h1>
        <p className="primary-text">
          Our customers are saying that the process was seamless, and the range
          of plans offered allowed them to find the perfect fit for their
          lifestyle and budget.
        </p>
      </div>
      <div
        className={`testimonial-section-bottom ${isVisible ? "visible" : ""}`}
      >
        <img src={ProfilePic} alt="" />
        <p>
          Choosing AssistCare for my health insurance needs was one of the best
          decisions I have made for myself and my family. From the moment I
          enrolled, I felt supported and valued as a member.
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Davidson</h2>
      </div>
    </div>
  );
};

export default Testimonial;
