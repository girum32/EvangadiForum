import React, { useState, useEffect } from 'react';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import style from './Header.module.css';
import logo from '../../assets/images/HeaderLogo.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log('Token removed:', localStorage.getItem('token'));
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div className={style.header__container}>
            <div className={style.header__logo}>
                <Link to="/">
                    <img src={logo} alt="Evangadi Logo" />
                </Link>
            </div>

            <div className={style.hamburger} onClick={toggleMenu}>
                {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </div>
            <div className={`${style.header__nav} ${isMenuOpen ? style.active : ''}`}>
                <ul className={style.header__nav__list}>
                    <li>
                        <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    </li>
                    <li>
                        <Link to="/howItWorks" onClick={() => setIsMenuOpen(false)}>How it Works</Link>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <Link to="/login" onClick={handleLogout} className={style.logOut}>
                                <button id='log-out'>
                                    <FiLogOut size={20} className={style.icon} />
                                    Log Out
                                </button>
                            </Link>
                        ) : (
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className={style.signIn}>
                                <button id='sign-in'>Sign In</button>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
