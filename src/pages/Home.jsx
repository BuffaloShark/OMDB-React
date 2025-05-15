import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import MovieListHeading from '../components/MovieListHeading';
import UndrawMovies from '../assets/UndrawMovies.svg';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/results?query=${encodeURIComponent(searchValue.trim())}`);
    }, 1200); 
  };

  return (
<section id="landing">
    <header>
      <div className="header__container">
        <div className="header__description">
        <MovieListHeading heading="The most comprehensive entertainment database ever." />
        <h3>FIND YOUR NEXT DATE NIGHT WITH <span className='purple'>CINEMA.</span></h3>
        </div>
        <form className="search__bar" onSubmit={handleSearch}>
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            loading={loading}
          />
        </form>
        <figure className='header__img--wrapper'>
            <img src={UndrawMovies} alt="" />
        </figure>
      </div>
    </header>
</section>
  );
};

export default Home;
