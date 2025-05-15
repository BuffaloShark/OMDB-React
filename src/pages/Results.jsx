import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import MovieList from "../components/MovieList";
import SearchBoxSecondary from "../components/SearchBoxSecondary";
import SkeletonMovieCard from "../components/SkeletonMovieCard";
import MovieFilters from "../components/MovieFilters";

const Results = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("query") || "";

  const [searchValue, setSearchValue] = useState(initialSearch);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [genreFilter, setGenreFilter] = useState("");
  const [yearSort, setYearSort] = useState("");
  const [ratingSort, setRatingSort] = useState("");

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const getMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=4c143b18`
      );
      const data = await response.json();

      if (data.Search) {
        const enriched = await Promise.all(
          data.Search.map(async (movie) => {
            const res = await fetch(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=4c143b18`
            );
            const fullData = await res.json();
            return {
              ...movie,
              Genre: fullData.Genre,
              imdbRating: fullData.imdbRating,
              Runtime: fullData.Runtime,
            };
          })
        );
        setMovies(enriched);
        setFilteredMovies(enriched);
      } else {
        setMovies([]);
        setFilteredMovies([]);
      }
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    if (searchValue) getMovies(searchValue);
  }, [searchValue]);

  useEffect(() => {
    let updated = [...movies];

    if (genreFilter) {
      updated = updated.filter((movie) => movie.Genre?.includes(genreFilter));
    }

    if (yearSort) {
      updated.sort((a, b) =>
        yearSort === "asc"
          ? parseInt(a.Year) - parseInt(b.Year)
          : parseInt(b.Year) - parseInt(a.Year)
      );
    }

    if (ratingSort) {
      updated.sort((a, b) =>
        ratingSort === "high"
          ? parseFloat(b.imdbRating) - parseFloat(a.imdbRating)
          : parseFloat(a.imdbRating) - parseFloat(b.imdbRating)
      );
    }

    setFilteredMovies(updated);
  }, [genreFilter, yearSort, ratingSort, movies]);

  return (
    <div id="movies__body">
      <main id="movies__main">
        <section id="results">
          <div className="results__header pt-16">
            <div class="row__main--title">
              <h2 class="section__title movies__header--results">
                Browse more movies
              </h2>

              <SearchBoxSecondary
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onKeyPress={(e) =>
                  e.key === "Enter" && setSearchValue(e.target.value)
                }
              />
            </div>
          </div>
          <div className="row">
            <MovieFilters
              genreFilter={genreFilter}
              setGenreFilter={setGenreFilter}
              yearSort={yearSort}
              setYearSort={setYearSort}
              ratingSort={ratingSort}
              setRatingSort={setRatingSort}
            />

            <h3>Showing results for: <span className="orange">"{searchValue}"</span></h3>

            <div className="container">
              <div className="row">
                <div className="movies">
                  {loading ? (
                    [...Array(6)].map((_, idx) => (
                      <SkeletonMovieCard key={idx} />
                    ))
                  ) : (
                    <MovieList
                      movies={filteredMovies}
                      toggleFavorite={toggleFavorite}
                      favorites={favorites}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Results;
