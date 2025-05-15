import React from 'react';

const SkeletonMovieCard = () => {
  return (
    <div className="movie skeleton">
      <div className="skeleton-block skeleton-poster" />
      <div className="skeleton-block skeleton-title" />
      <div className="skeleton-block skeleton-year" />
      <div className="skeleton-block skeleton-rating" />
    </div>
  );
};

export default SkeletonMovieCard;
