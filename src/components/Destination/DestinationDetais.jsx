import React, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import Navbar from "../Navbar";
import BannerSection from "../../Banner";
import imagePaths from "../../Constrants/imagePath";
import "./destination.css"; // Import the CSS file

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    fetchDestination();
  }, []);

  const fetchDestination = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/destination/destinations/${id}`
      );
      const data = await response.json();
      setDestination(data);
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  if (!destination) return <p className="loading-text">Loading...</p>;

  return (
    <div className="destination-details">
      <Navbar />
      <BannerSection headingText={destination.name} />
      <div className="content-container">
        <div className="discount-box">
          <img
            src={imagePaths.discountBannerAd}
            alt="Discount Banner"
            className="discount-banner"
          />
        </div>
        <div className="destination-info">
          <img
            src={destination.image}
            alt={destination.name}
            className="destination-image"
          />
          <div className="details">
            <h1 className="destination-name">{destination.name}</h1>
            <p className="destination-description">{destination.description}</p>
            <div className="additional-info">
              <h3>Additional Information</h3>
              <p>
                <strong>Location:</strong>{" "}
                {destination.location || "Not provided"}
              </p>
              <p>
                <strong>Best Time to Visit:</strong>{" "}
                {destination.bestTime || "Not specified"}
              </p>
              <p>
                <strong>Activities:</strong>{" "}
                {destination.activities || "Not available"}
              </p>
            </div>
          </div>
        </div>
        {/* New Destination Package Section - moved below */}
        <div className="destination-package">
          <h2>Destination Packages</h2>
          {destination.packages && destination.packages.length > 0 ? (
            <div className="package-list-detail">
              {destination.packages.map((pkg, index) => (
                <div key={index} className="package-item">
                  <h3>{pkg.name}</h3>
                  <p>{pkg.description}</p>
                  <div className="my-4 fs-4">
                    <strong>Price:</strong> ₹{pkg.price}
                  </div>
                  <Link to="/contact-us" className="book-now-btn text-decoration-none">Enquire Now</Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No packages available for this destination.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
