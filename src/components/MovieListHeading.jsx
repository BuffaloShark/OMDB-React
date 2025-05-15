import React from "react";

const MovieListHeading = (props) => {
    return (
        <div className="header__description">
        <h1 className="movies__header--title">{props.heading}</h1>
        </div>
    )
};

export default MovieListHeading;