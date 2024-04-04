import React from "react";
import Plans from "../../assets/plan.png";
import Claims from "../../assets/claim.png";
import Account from "../../assets/manageaccount.png";
import "./Work.css";
const Work = () => {
  const workInfoData = [
    {
      image: Plans,
      title: "Choose your Plan",
      text: "Browse through our range of health insurance plans tailored to your budget. ",
    },
    {
      image: Claims,
      title: "Submit your Claims",
      text: "Our claims process is designed to be efficient, saving you time and effort.",
    },
    {
      image: Account,
      title: "Manage your Account",
      text: "View your coverage details, track claims, and manage payments all in one place.",
    },
  ];
  return (
    <div id="work" className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          At AssistCare, we are committed to providing you with the peace of
          mind that comes from knowing you are covered by a trusted health
          insurance provider. Discover the convenience and reliability of
          AssistCare health insurance today.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" className="work-section-image" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
