import React from 'react';
import './Header.css';
import logo from './assets/logo.png';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <img src={logo} alt='Alkadi Logo' className='header__logo-img' />
        <nav className='header__nav'>
          <a href='#home' className='header__link'>
            Home
          </a>
          <a href='#about' className='header__link'>
            About
          </a>
          <a href='#services' className='header__link'>
            Services
          </a>
          <a href='#contact' className='header__link'>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
