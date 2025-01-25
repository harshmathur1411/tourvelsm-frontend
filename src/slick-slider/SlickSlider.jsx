import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imagePaths from "../Constrants/imagePath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../src/App.css";

const SlickSlider = () => {
  const settings = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    centerMode: true, // Enables centered view
    centerPadding: "20px", // Adds padding between slides
  };

  const slides = [
    {
      id: 1,
      comment:
        "Our family had an unforgettable trip to Singapore! The tour was well-organized, the guide was incredibly knowledgeable, and every detail was handled with care. We especially loved the local cultural experiences—it truly felt authentic. Highly recommended!",
      image: imagePaths.user1Img,
      rating: 5, // Rating out of 5
    },
    {
      id: 2,
      comment:
        "From booking to the end of the tour, the customer service was top-notch. The team was responsive, accommodating, and ensured everything ran smoothly. I appreciated the personal touches, like a welcome note upon arrival. I’ll definitely book again!",
      image: imagePaths.user2Img,
      rating: 4, // Rating out of 5
    },
    {
      id: 3,
      comment:
        "As a solo traveler, I was initially nervous, but this tour exceeded all expectations. The group was friendly, the itinerary was engaging, and there was a perfect balance between guided activities and free time. I made great friends along the way!",
      image: imagePaths.user3Img,
      rating: 3, // Rating out of 5
    },
    // Add rating for other slides as needed
  ];

  return (
    <div className="slider-review text-center">
      <span>Review & Testimonials</span>
      <h2 className="mt-3 mb-5">Top Reviews for Travio</h2>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div className="review-slides" key={slide.id}>
            <div className="rating">
              <ul className="list-unstyled">
                {/* Loop to display the rating stars */}
                {Array.from({ length: 5 }, (_, index) => (
                  <li key={index}>
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{
                        color: index < slide.rating ? "#e47812" : "#ddd", // Filled or empty star
                        fontSize: "14px",
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="user-profilePic">
              <img src={slide.image} alt={slide.comment} />
            </div>

            <p>{slide.comment}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickSlider;
