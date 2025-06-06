import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

const SearchBox = ({ searchValue, setSearchValue, loading }) => {
  return (
    <>
    <div className="content__wrapper">
        <div className="input__wrapper">
            <div className="search__bar">
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Do you feel lucky, punk?"
            />
                <div className="search__wrapper">
                    <div className="search__icon">    
                        <button className="btn" type="submit" disabled={loading}>
                            <FontAwesomeIcon
                            icon={loading ? faSpinner : faMagnifyingGlass}
                            spin={loading}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
