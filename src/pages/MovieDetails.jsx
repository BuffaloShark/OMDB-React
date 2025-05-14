import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SkeletonMovieCard from '../components/SkeletonMovieCard';

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=4c143b18`);
        const data = await res.json();
        setTimeout(() => {
          setMovie(data);
          setLoading(false);
        }, 800); 
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) return <SkeletonMovieCard />;

  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-details">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="movie-info">
        <h2>{movie.Title}</h2>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Runtime:</strong> {movie.Runtime}</p>
        <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
