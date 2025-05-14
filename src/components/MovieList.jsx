import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';  

const MovieList = ({ movies }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = (movie) =>
    favorites.some((fav) => fav.imdbID === movie.imdbID);

  if (!movies || movies.length === 0) return <div>No movies found.</div>;

  return (
    <>
      {movies.map((movie) => (
        <div className="image-container" key={movie.imdbID}>
          <Link to={`/movie-details/${movie.imdbID}`}>
            <img src={movie.Poster} alt={movie.Title} />
            <h5 className="movie__title">{movie.Title}</h5>
            <h5 className="movie__year">{movie.Year}</h5>
            <h5 className="movie__year">{movie.imdbRating}</h5>
          </Link>
         
          <div className="overlay" onClick={() => toggleFavorite(movie)}>
            <FontAwesomeIcon
              icon={isFavorite(movie) ? solidHeart : regularHeart}
              className="favorite-icon"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
