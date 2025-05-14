import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import MovieList from '../components/MovieList';
import SearchBox from '../components/SearchBox';
import SkeletonMovieCard from '../components/SkeletonMovieCard';

const Results = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('query') || '';

  const [searchValue, setSearchValue] = useState(initialSearch);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [genreFilter, setGenreFilter] = useState('');
  const [yearSort, setYearSort] = useState('');
  const [ratingSort, setRatingSort] = useState('');

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const getMovies = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=4c143b18`);
      const data = await response.json();

      if (data.Search) {
        const enriched = await Promise.all(
          data.Search.map(async (movie) => {
            const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=4c143b18`);
            const fullData = await res.json();
            return { ...movie, Genre: fullData.Genre, imdbRating: fullData.imdbRating, Runtime: fullData.Runtime };
          })
        );
        setMovies(enriched);
        setFilteredMovies(enriched);
      } else {
        setMovies([]);
        setFilteredMovies([]);
      }
    } catch (err) {
      console.error('Failed to fetch movies:', err);
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
        yearSort === 'asc'
          ? parseInt(a.Year) - parseInt(b.Year)
          : parseInt(b.Year) - parseInt(a.Year)
      );
    }

    if (ratingSort) {
      updated.sort((a, b) =>
        ratingSort === 'high'
          ? parseFloat(b.imdbRating) - parseFloat(a.imdbRating)
          : parseFloat(a.imdbRating) - parseFloat(b.imdbRating)
      );
    }

    setFilteredMovies(updated);
  }, [genreFilter, yearSort, ratingSort, movies]);

  return (
    <div className="container">
      <h2>Results for: "{initialSearch}"</h2>

      <SearchBox
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onKeyPress={(e) => e.key === 'Enter' && setSearchValue(e.target.value)}
      />

      <div className="filter-wrapper">
        <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>

        <select value={yearSort} onChange={(e) => setYearSort(e.target.value)}>
          <option value="">Sort by Year</option>
          <option value="asc">Oldest to Newest</option>
          <option value="desc">Newest to Oldest</option>
        </select>

        <select value={ratingSort} onChange={(e) => setRatingSort(e.target.value)}>
          <option value="">Sort by Rating</option>
          <option value="high">Highest First</option>
          <option value="low">Lowest First</option>
        </select>
      </div>

      {loading ? (
        <div className="skeleton-container">
          {[...Array(6)].map((_, idx) => (
            <SkeletonMovieCard key={idx} />
          ))}
        </div>
      ) : (
        <MovieList
          movies={filteredMovies}
          toggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      )}
    </div>
  );
};

export default Results;
