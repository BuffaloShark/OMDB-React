import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CinemaLogo from '../assets/CinemaLogo.svg'
import { Link } from "react-router-dom";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
    function openMenu() {
        document.body.classList.add("menu--open");
    }

    function closeMenu() {
        document.body.classList.remove("menu--open")
    }
    
    return (
    <nav>
        <div className="nav__container">
            <Link to="/">
            <img src={CinemaLogo} alt="" className="logo" />
            </Link>
            <ul className="nav__links">
                <li className="nav__list">
                    <Link to="/" className="nav__link">
                    Home
                    </Link>
                </li>
                <li className="nav__list">
                    <Link to="/results" className="nav__link">
                    Find Movies
                    </Link>
                </li>
                <li className="nav__list">
                    <Link to="/favorites" className="nav__link nav__link--primary">
                    My Favorites
                    </Link>
                </li>
            </ul>
                <button className="btn__menu" onClick={openMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                
            <div className="menu__backdrop">
                <button className="btn__menu btn__menu--close" onClick={closeMenu}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <ul className="menu__links">
                    <li className="menu__list">
                        <Link to="/" className="menu__link" onClick={closeMenu}>
                        Home
                        </Link>
                    </li>
                    <li className="menu__list">
                        <Link to="/favorites" className="menu__link" onClick={closeMenu}>
                        My Favorites
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}

export default Nav;