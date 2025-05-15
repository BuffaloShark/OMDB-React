import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SkeletonMovieCard from "../components/SkeletonMovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import MovieDetailsSkeleton from "../components/MovieDetailsSkeleton";

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${imdbID}&apikey=4c143b18`
        );
        const data = await res.json();
        setTimeout(() => {
          setMovie(data);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) return <MovieDetailsSkeleton />;


  if (!movie) return <p>Movie not found.</p>;

  return (
    <>
    <button onClick={handleBack} className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Back
    </button>
    <div id="movies__body">
      <main id="movies__main">
        <div className="movies__container">
          <div className="row">
            <div className="movie__selected">
              <figure className="movie__selected--figure">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="movie__selected--img"
                />
              </figure>
              <div className="movie__selected--description">
                <h2 className="movie__selected--title">{movie.Title}</h2>
                <div className="movie__selected--year">
                  <strong>Year:</strong> {movie.Year}
                </div>
                <div className="movie__selected--genre">
                  <strong>Genre:</strong> {movie.Genre}
                </div>
                <div className="movie__selected--runtime">
                  <strong>Runtime:</strong> {movie.Runtime}
                </div>
                <div className="movie__selected--rating">
                  <strong>IMDb Rating:</strong> {movie.imdbRating}/10
                </div>
                <div className="movie__summary">
                  <h3 className="movie__summary--title">Plot:</h3>
                </div>
                <div className="movie__summary--para">{movie.Plot}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default MovieDetails;
