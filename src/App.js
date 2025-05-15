import React, { use, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Router } from 'react-router-dom'
import './index.css'
import Nav from "./components/Nav";
import MovieDetails from "./pages/MovieDetails";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Results from "./pages/Results";
import Footer from "./components/Footer";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=4c143b18`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else {
      setMovies([]);
    }
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  };

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites')) || [];
    setFavorites(movieFavorites);
  }, []);

  const handleFavoritesClick = (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
      setFavorites(updatedFavorites);
      saveToLocalStorage(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      saveToLocalStorage(updatedFavorites);
    }
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      getMovieRequest(searchValue);
      navigate('/search');
    }
  };

  return (
    <>
      <div className="App">
          <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/movie-details/:imdbID" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
