import React, { useState } from "react";
import Navbar from "./Navbar";
import imagePaths from "../Constrants/imagePath";
import BannerSection from "../Banner";
import Footer from "./Footer";
import SlickSlider from "../slick-slider/SlickSlider";
import { locations } from "./Destination/destinationData" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { faAward } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const listings = [
    {
      id: 1,
      title: "Thailand",
      description:
        "Thailand is a vibrant country in Southeast Asia known for its rich culture, stunning natural landscapes, and welcoming people.",
      image: imagePaths.ThailandImg,
      price: "₹34,000",
      day: "3N",
    },
    {
      id: 2,
      title: "Maldives",
      description:
        "The Maldives, officially the Republic of Maldives, is a tropical paradise located in the Indian Ocean. Known for its pristine white-sand beaches, crystal-clear waters, and luxurious overwater resorts, it is a dream destination for travelers seeking tranquility and beauty",
      image: imagePaths.Maldivesimg,
      price: "₹34,000",
      day: "3N",
    },
    {
      id: 3,
      title: "Dubai",
      description:
        "Dubai, a city in the United Arab Emirates (UAE), is renowned for its modern architecture, luxury shopping, and vibrant culture. It is one of the most popular tourist destinations in the world, blending innovation with tradition.",
      image: imagePaths.DubaiImg,
      price: "₹34,000",
      day: "4N",
    },
    {
      id: 4,
      title: "Kerela",
      description:
        "Kerala, a state on India's tropical Malabar Coast, is known for its palm-lined beaches, backwaters, and network of canals.",
      image: imagePaths.KeralaImg,
      price: "₹34,000",
      day: "4N",
    },
    {
      id: 5,
      title: "Singapore",
      description:
        "Singapore is a global financial hub known for its tropical climate, multicultural population, and iconic landmarks like Marina Bay Sands.",
      image: imagePaths.SingaporeImg,
      price: "₹54,000",
      day: "2N",
    },
  ];

  // State to track visible items and batch size
  const [visibleCount, setVisibleCount] = useState(4);
  const batchSize = 2; // Number of items to load in each step

  // Function to handle loading more items
  const handleLoadMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + batchSize, listings.length)
    );
  };

  return (
    <div>
      <Navbar />
      <BannerSection headingText="TRAVELLING AROUND THE WORLD" />
      <section className="package-list heading-title">
        <h2>Popular Packages</h2>
        <div className="listings-container container">
          {listings.slice(0, visibleCount).map((listing) => (
            <div key={listing.id} className="listing-item">
              <div className="image-container">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="listing-image"
                />
                <div className="box-body">
                  <h3>{listing.title}</h3>
                  <span>
                    {listing.price} / {listing.day}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Show "Load More" button only if there are more items to display */}
        {visibleCount < listings.length && (
          <div className="view-all-container">
            <button
              onClick={handleLoadMore}
              className="btn btn-primary view-all-button"
            >
              View All Packages
            </button>
          </div>
        )}
      </section>
      <section className="bg-light text-center py-5">
        <div className="container">
          <div className="choose-us">
            <h2 className="position-relative pb-4">Why to Choose Us</h2>
            <p className="px-5 line-height-100 mt-5 mb-4">
              We are passionate about crafting unforgettable travel experiences,
              offering personalized itineraries that cater to your unique
              interests and dreams. Whether you’re looking for a relaxing beach
              getaway, a thrilling adventure in the mountains, or an exploration
              of cultural gems around the world, we’re here to make it happen.
              With years of expertise, a commitment to exceptional customer
              service, and a network of trusted partners, we ensure every detail
              of your trip is taken care of. At Tourvelsm, we believe that
              travel is more than just visiting new places—it’s about creating
              memories that last a lifetime. Let us help you discover the world,
              one destination at a time.
            </p>
          </div>
          <div className="row justify-content-center my-5">
            <div className="col-lg-3 choose-box">
              <div className="choose-icon">
                <FontAwesomeIcon
                  icon={faTags}
                  style={{ color: "#ef2853", fontSize: "58px" }}
                />
              </div>
              <h3>Competetive Pricing</h3>
              <p>
                With 500+ suppliers and the purchasing power of 300 million
                members
              </p>
            </div>
            <div className="col-lg-3 choose-box">
              <div className="choose-icon">
                <FontAwesomeIcon
                  icon={faAward}
                  style={{ color: "#ef2853", fontSize: "58px" }}
                />
              </div>
              <h3>Award Winning Service</h3>
              <p>
                Fabulous Travel worry free knowing that we're here if you need
                us, 24 hours a day
              </p>
            </div>
            <div className="col-lg-3 choose-box">
              <div className="choose-icon">
                <FontAwesomeIcon
                  icon={faGlobe}
                  style={{ color: "#ef2853", fontSize: "58px" }}
                />
              </div>
              <h3>Worldwide Coverage</h3>
              <p>
                1,200,000 hotels in more than 200 countries and regions &
                flights to over 5,000 citites.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="slider-section py-5 my-5">
        <div className="container">
          <SlickSlider />
        </div>
      </section>
      <section className="">
        <div className="container">
          <div className="contact-section subscribe-inner">
            <div className="row">
              <div className="col-6">
                <div className="contact-bg">
                  <img
                    src={imagePaths.contactBg}
                    alt=""
                    className="w-100 h-100"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="newsletter-cover">
                  <h3>newsletter</h3>
                  <h2>SUBSCRIBE NOW</h2>
                  <p>
                    Sign up for our mailing list to get latest updates and
                    offers
                  </p>
                  <div className="form-group d-flex w-75 my-5">
                    <input
                      className="form-control rounded-0"
                      placeholder="Email Address"
                    />
                    <button className="btn news-letterBtn">
                      <FontAwesomeIcon
                        icon={faEnvelopeOpen}
                        style={{ color: "#fff" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="popular-destinations py-5">
        <div className="container">
          <h2 className="text-center mb-4">Season's Destinations</h2>
          <div className="row">
            {locations.map((location) => (
              <div className="col-md-4" key={location.id}>
                <div className="destination-item">
                  <div className="season-destination-img">
                  <img src={location.image} alt={location.name} /></div>
                  <h3>{location.name}</h3>
                  <p>{location.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
