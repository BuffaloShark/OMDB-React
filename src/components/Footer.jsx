import React from "react";
import FooterLogo from '../assets/CinemaLogo_reverse.svg';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row row__column">
                    <Link to="/">
                    <figure className="footer__logo">
                        <img src={FooterLogo} className="footer__logo--img" alt="" />
                        </figure>
                        </Link>
                        <div className="footer__list">
                            <Link to="/" className="footer__link">Home</Link>
                            <span className="footer__link no-cursor">About</span>
                            <Link to="/favorites" className="footer__link">Favorites</Link>
                        </div>
                        <div className="footer__copyright">
                            Copyright &copy; 2025 
                        </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;