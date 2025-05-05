import React from "react";

const Landing = () => {
    return (
    <section id="header" class="overlay">
      <div class="container">
        <div class="row__main--title">
          <h2 class="section__title movies__header--title">
            BROWSE MOVIES
          </h2>
        </div>
            <div class="content__wrapper">
                <div class="input__wrapper">
                    <div class="search__bar">
                    <input type="text" id="search-input" class="form-control" placeholder="Search title or keyword" />
                        <div id="results-container">
                        </div>
                        <div class="search__wrapper">
                            <div class="search__icon">
                                <button class="submit btn" id="search-button">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Landing;