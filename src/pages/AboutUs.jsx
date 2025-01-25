import React, { useEffect, useState } from "react";
import BannerSection from "../Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FAQsAccordion from "../components/FAQ's/FAQsAccordion"; 

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/about-us");
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error("Error fetching About Us data:", error);
      }
    };

    fetchData();
  }, []);

  if (!aboutData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
    <Navbar />
    <BannerSection />
      <div className="container">
      <section className="about-header my-5">
        <h1>{aboutData.title}</h1>
        <p className="description">{aboutData.description}</p>
      </section>

      <section className="about-details">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>{aboutData.mission}</p>
        </div>

        <div className="about-card">
          <h2>Our Vision</h2>
          <p>{aboutData.vision}</p>
        </div>

        <div className="about-card">
          <h2>Our Values</h2>
          <ul>
            {aboutData.values.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      </section>

      {aboutData.image && (
        <section className="about-image my-4">
          <div className="row">
            <div className="col-6">
              <div className="about-heading-sec">
                <h2>Little More About Us</h2>
                <p className="description my-4">{aboutData.description}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="feature-sec-img">
              <img src={aboutData.image} alt="About Us" />
              </div>
            </div>
          </div>
          
        </section>
      )}
            <FAQsAccordion />
    </div>
    <Footer />
    </>
  
  );
};

export default AboutUs;
