import React from "react";

const SearchBox = (props) => {
    return (
        <div className="content__wrapper">
            <div className="input__wrapper">
                <div className="search__bar">
                    <input type="text" 
                    id="search-input" 
                    className="form-control" 
                    placeholder="Do you feel lucky, punk?"
                    onChange={(event) => props.setSearchValue(event.target.value)} />
                    {/* <div className="results-container"></div> */}
                    <div className="search__wrapper">
                        <div className="search__icon">
                            <button className="submit btn" id="search-button">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SearchBox;