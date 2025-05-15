import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

const SearchBox = ({ searchValue, setSearchValue }) => {
  return (
    <>
    <div className="content__wrapper">
        <div className="input__wrapper">
            <div className="search__bar">
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Type to search..."
            />
                <div className="search__wrapper">
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
