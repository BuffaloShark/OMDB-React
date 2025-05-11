import React, { use, useEffect, useState } from "react";
import './App.css'
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";
import RemoveFavorites from "./components/RemoveFavorites";

const App = () => {
  const [movies, setMovies] = useState([]);
  // const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('')

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=4c143b18`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  // useEffect(() => {
  //   const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'));
  //   setFavorites(movieFavorites);
  // }, [])

  // const saveToLocalStorage = (items) => {
  //   localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
  // }

  // const addFavoriteMovie = (movie) => {
  //   const newFavoriteList = [...favorites, movie]
  //   setFavorites(newFavoriteList);
  //   saveToLocalStorage(newFavoriteList);
  // }

  // const removeFavoriteMovie = (movie) => {
  //   const newFavoriteList = favorites.filter((favorite) => favorite.imdbID !== movie.imdbID);

  //   setFavorites(newFavoriteList);
  //   saveToLocalStorage(newFavoriteList);
  // }

  return (
      <div className="container">
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="row" id="{movie.imdbID}">          
          <div className="card-body">
            <MovieList 
            movies={movies} 
            // handleFavoritesClick={addFavoriteMovie} 
            // favoriteComponent={AddFavorites} />
            />
          </div>
        </div>
        {/* <div className="row">
          <div className="card-body">
          <MovieList movies={favorites}
          handleFavoritesClick={removeFavoriteMovie}
          favoriteComponent={RemoveFavorites} /> 
          </div>
        </div> */}
      </div>
  );
}

export default App;
