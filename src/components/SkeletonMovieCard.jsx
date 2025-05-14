import React from 'react';

const SkeletonMovieCard = () => {
  return (
    <div className="image-container skeleton">
      <div className="skeleton-poster" />
      <div className="skeleton-title" />
      <div className="skeleton-year" />
    </div>
  );
};

export default SkeletonMovieCard;
