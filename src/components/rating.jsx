import React, { useEffect, useState } from 'react';

const Rating = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/blogs');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Customer Reviews</h2>
      {reviews.map((review) => (
        <Review key={review._id} review={review} />
      ))}
    </div>
  );
};

const Review = ({ review }) => {
  return (
    <div className="review">
      <h4>{review.username}</h4>
      <RatingStars rating={review.rating} />
      <p>{review.comment}</p>
    </div>
  );
};

export default Rating;
