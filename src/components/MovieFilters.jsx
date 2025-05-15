import { faCalendarAlt, faFilm, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const MovieFilters = ({
  genreFilter,
  setGenreFilter,
  yearSort,
  setYearSort,
  ratingSort,
  setRatingSort,
}) => {
  return (
    <div className="filter-wrapper">
  <div className="filter-group">
    <label htmlFor="genre">
      <FontAwesomeIcon icon={faFilm} /> Genre
    </label>
    <select id="genre" value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
      <option value="">All Genres</option>
      <option value="Action">Action</option>
      <option value="Drama">Drama</option>
      <option value="Comedy">Comedy</option>
      <option value="Horror">Horror</option>
      <option value="Sci-Fi">Sci-Fi</option>
    </select>
  </div>

  <div className="filter-group">
    <label htmlFor="year">
      <FontAwesomeIcon icon={faCalendarAlt} /> Year
    </label>
    <select id="year" value={yearSort} onChange={(e) => setYearSort(e.target.value)}>
      <option value="">Sort by Year</option>
      <option value="asc">Oldest to Newest</option>
      <option value="desc">Newest to Oldest</option>
    </select>
  </div>

  <div className="filter-group">
    <label htmlFor="rating">
      <FontAwesomeIcon icon={faStar} /> Rating 
    </label>
    <select id="rating" value={ratingSort} onChange={(e) => setRatingSort(e.target.value)}>
      <option value="">Sort by Rating</option>
      <option value="high">Highest First</option>
      <option value="low">Lowest First</option>
    </select>
  </div>
</div>

  );
};

export default MovieFilters;
