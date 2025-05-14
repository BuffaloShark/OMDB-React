import React from "react";

const Filter = ({ filter, setFilter }) => {
    return (
    <div className="filter">
      <label>Filter by Type:</label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
    </div>
    );
  };
  
  export default Filter;
  