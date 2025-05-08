import React from "react";

const Movies = () =>
{
let movies;

async function renderMovies(filter) {
  const moviesWrapper = document.querySelector(".movies");

  moviesWrapper.classList += ' movies__loading'

  if (!movies) {
    movies = await getmovies();
  }
  
  moviesWrapper.classList.remove('movies__loading')

  if (filter === "LOW_TO_HIGH") {
    movies.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    movies.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    movies.sort((a, b) => b.rating - a.rating);
  }

  const moviesHtml = movies
    .map((movie) => {
      return `<div class="movie">
    <figure class="movie__img--wrapper">
      <img class="movie__img" src="${movie.url}" alt="">
    </figure>
    <div class="movie__title">
      ${movie.title}
    </div>
    <div class="movie__ratings">
      ${ratingsHTML(movie.rating)}
    </div>
    <div class="movie__price">
      ${priceHTML(movie.originalPrice, movie.salePrice)}
    </div>
  </div>`;
    })
    .join("");

  moviesWrapper.innerHTML = moviesHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`;
  }
  return `<span class="movie__price--normal">$${originalPrice.toFixed(
    2
  )}</span>$${salePrice.toFixed(2)}`;
}

function ratingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); ++i) {
    ratingHTML += '<i class="fas fa-star"></i>\n';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
  }
  return ratingHTML;
}

function filtermovies(event) {
  rendermovies(event.target.value);
}

setTimeout(() => {
  rendermovies();
});
};

export default Movies;