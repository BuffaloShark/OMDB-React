import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";
import SearchBoxSecondary from "../components/SearchBoxSecondary";
import MovieList from "../components/MovieList";
import MovieFilters from "../components/MovieFilters";
import UndrawEmpty from "../assets/undraw_empty_4zx0.svg"

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState(favorites);

  const [genreFilter, setGenreFilter] = useState("");
  const [yearSort, setYearSort] = useState("");
  const [ratingSort, setRatingSort] = useState("");

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1)
    };

  useEffect(() => {
    let updated = [...favorites];

    if (searchTerm.trim()) {
      updated = updated.filter((movie) =>
        movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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

    setFilteredFavorites(updated);
  }, [searchTerm, favorites, genreFilter, yearSort, ratingSort]);

  return (
    <div id="movies__body">
    <main id="movies__main">
      <section id="results">
        <div className="results__header pt-16">
          <div class="row__main--title">
            <h2 class="section__title movies__header--results">
              Browse your favorites
            </h2>

          <SearchBoxSecondary
            searchValue={searchTerm}
            setSearchValue={setSearchTerm}
            onKeyPress={(e) =>
              e.key === "Enter" && setSearchTerm(e.target.value)
            }
          />
          </div>
          </div>

          <MovieFilters
            genreFilter={genreFilter}
            setGenreFilter={setGenreFilter}
            yearSort={yearSort}
            setYearSort={setYearSort}
            ratingSort={ratingSort}
            setRatingSort={setRatingSort}
          />

          <div className="container">
            <div className="row">
              <div className="movies">
                {filteredFavorites.length > 0 ? (
                  <MovieList movies={filteredFavorites} />
                ) : (
                    <div className='void'>
                    <img className='void' src={UndrawEmpty} alt="" />
                    <h2>You do not have any saved favorites.</h2>
                    <h3>Go find some!</h3>
                    </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Favorites;
