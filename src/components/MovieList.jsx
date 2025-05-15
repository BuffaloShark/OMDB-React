import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';  
import UndrawVoid from '../assets/undraw_void_wez2.svg';


const MovieList = ({ movies }) => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = (movie) =>
    favorites.some((fav) => fav.imdbID === movie.imdbID);

  if (!movies || movies.length === 0) return <div className='void'>
    <img className='void' src={UndrawVoid} alt="" />
    <h2>I couldn't find it. I ran through the mist and I couldn't find it.</h2>
    <h3>&ndash; <em>Gone With the Wind.</em><br/>Please try again.</h3>
    </div>;

  return (
    <>
      {movies.map((movie) => (
        <div className="movie" key={movie.imdbID}>
        <Link to={`/movie-details/${movie.imdbID}`} className="movie__card">
          <figure className="movie__img--wrapper">
            <img className="movie__img" src={movie.Poster} alt={movie.Title} />
            <div
              className="overlay"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                toggleFavorite(movie);
              }}
            >
              <FontAwesomeIcon
                icon={isFavorite(movie) ? solidHeart : regularHeart}
                className="favorite-icon"
              />
            </div>
          </figure>
      
          <div className="movie__details">
            <h3 className="movie__title">{movie.Title}</h3>
            <p className="movie__year">{movie.Year}</p>
            <p className="movie__genre">{movie.Genre}</p>
            <p className="movie__rating">IMDB Rating: {movie.imdbRating}/10</p>
          </div>
        </Link>
      </div>
      
      ))}
    </>
  );
};

export default MovieList;
