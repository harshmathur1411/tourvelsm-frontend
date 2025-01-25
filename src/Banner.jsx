// BannerSection.js
import React from "react";

const BannerSection = ({ headingText }) => {
  return (
    <div className="banner-section">
      <div className="banner-text position-absolute">
        <h2>{headingText}</h2>
      </div>
    </div>
  );
};



export default BannerSection;
