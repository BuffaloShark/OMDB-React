import React from "react";

const MovieList = (props) => {
    const favoriteComponent = props.favoriteComponent;
    return (
        <>
        {props.movies.map((movie, index) => (
        <div>
            <img src={movie.Poster}></img>
            <h5 className="movie__title">{movie.Title}</h5>
            <h5 className="movie__year">{movie.Year}</h5>
            <div className="overlay" onClick={()=> props.handleFavoritesClick(movie)}>
                <favoriteComponent />
            </div>
        </div>))}
        </>
    )
};

export default MovieList;