import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import MovieListHeading from '../components/MovieListHeading';

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
    <div className="content__wrapper">
      <div className="input__wrapper">
        <MovieListHeading heading="Movies" />
        <form className="search__bar" onSubmit={handleSearch}>
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            loading={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
