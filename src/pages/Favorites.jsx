import React, { useContext, useEffect, useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import MovieList from '../components/MovieList';
import SkeletonMovieCard from '../components/SkeletonMovieCard';

const Favorites = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800); 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container">
      <h2>Your Favorite Movies</h2>

      {loading ? (
        <div className="skeleton-container">
          {[...Array(6)].map((_, idx) => (
            <SkeletonMovieCard key={idx} />
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <MovieList movies={favorites} toggleFavorite={toggleFavorite} favorites={favorites} />
      ) : (
        <p>No favorites yet. Go add some!</p>
      )}
    </div>
  );
};

export default Favorites;
