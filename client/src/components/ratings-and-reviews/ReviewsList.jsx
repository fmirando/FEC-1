import axios from 'axios';
import React from 'react';
import ReviewTile from './ReviewTile';

const { useState, useEffect } = React;

export default function ReviewsList({ product }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (product) {
      axios.get('/reviews', {
        params: {
          page,
          product_id: product.id,
        },
      })
        .then(({ data }) => setReviews([...reviews, ...data]));
    }
  }, [page, product]);

  const showMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="reviews-list">
      {
        reviews.length > 0
          ? reviews.map((review) => <ReviewTile key={review.review_id} review={review} />)
          : 'Loading...'
        }
      <button type="button" className="more-reviews" onClick={showMore}>More Reviews</button>
    </div>
  );
}
