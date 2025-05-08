import React from "react";

const searchMovies = () => {

const apiKey = '4c143b18';
const apiURL = 'https://www.omdbapi.com/';

const Search = async () => {
    const searchInput = document.querySelector('#search-input');
    const listMovie = document.querySelector('#list-movie');
    listMovie.innerHTML = 'The Dude Abides ...';

    const query = searchInput.value.trim();
    if (!query) return;

    setTimeout(async () => {
        try {
            const data = await fetch(`${apiURL}?apiKey=${apiKey}&s=${encodeURIComponent(query)}`)
            .then(res => res.json());

            if(data.Response === 'True') {
                listMovie.innerHTML = data.Search.map(movie => `
                    <div className="container">
                    <div className="row" id="${movie.imdbID}">
                    <img src="${movie.Poster}" class="movie__img">
                    <div class="card-body">
                    <h5 class="movie__title">${movie.Title}</h5>
                    <h6 class="movie__year">${movie.Year}</h6>
                    </div>
                    </div>
                    </div>`
                ).join('');
            } else {
                listMovie.innerHTML = `<h1 class="text-center">${data.Error}</h1>`;
            }
        }
        catch (error) {
            listMovie.innerHTML = `<h1 class="text-center">Houston, we have a problem.</h1>`;
            console.error(error);
        }
    }, 1000);
};

document.querySelector('#search-button').addEventListener('click', Search);

document.querySelector('#search-input').addEventListener('keyup', e => {
    if (e.key === 'Enter') Search();
});

document.querySelector('#list-movie').addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (card?.dataset.id) showMovieDetails(card.dataset.id);
});
};

export default searchMovies;