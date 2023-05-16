import React from 'react';
import StarRatings from '../../shared/StarRatings';
import IndividualRating from './IndividualRating';

export default function RatingsBreakdown(props) {
  const {
    ratings,
    recommended,
    ratingsFilter,
    setRatingsFilter,
  } = props;
  const totalRatings = Object.values(ratings).reduce((total, num) => total + Number(num), 0);
  const percentRecommended = Math.floor(
    (Number(recommended.true) / (Number(recommended.true) + Number(recommended.false))) * 100,
  );
  const ratingsValues = Object.keys(ratings);
  const averageRatings = (ratingsValues
    .reduce((total, value) => total + (Number(ratings[value]) * Number(value)), 0) / totalRatings)
    .toFixed(1);

  const clearFilter = (num) => {
    if (num) {
      setRatingsFilter(ratingsFilter.filter((val) => val !== num));
    } else {
      setRatingsFilter([]);
    }
  };

  return (
    <div className="ratings-breakdown">
      <span className="average-rating">
        <span className="average-rating-display">{averageRatings}</span>
        <StarRatings rating={averageRatings} />
      </span>
      <div className="recommend-percentage">
        {`${percentRecommended}% of reviews recommend this product`}
      </div>
      {ratingsValues.map(
        (star) => (
          <IndividualRating
            key={star}
            rating={star}
            ratingCount={ratings[star]}
            totalRatings={totalRatings}
            ratingsFilter={ratingsFilter}
            setRatingsFilter={setRatingsFilter}
          />
        ),
      )}
      {
        ratingsFilter.length
          ? (
            <div className="ratings-filter-display">
              <button type="button" onClick={() => clearFilter()}>Clear All</button>
              {
                ratingsFilter.map((num) => (
                  <button type="button" onClick={() => clearFilter(num)}>{num}</button>
                ))
              }
            </div>
          )
          : null
      }
    </div>
  );
}