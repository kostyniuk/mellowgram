import React from 'react';

import '../styles/header.css';

const Header = () => {
  return (
    <div>
      <nav className='header-nav'>
        <div className='hamburger'>
          <span className='line'></span>
          <span className='line'></span>
          <span className='line'></span>
        </div>
        <div class='logo'>
        <img src={process.env.PUBLIC_URL + '/apple-icon-60x60.png'} />
        <a className='a-header' href='/' >Mellowgram</a>
        </div>
        <ul className='nav-items'>
          <li className='nav-item'>
            <a className='a-header' href='#'>About us</a>
          </li>
          <li>|</li>
          <li className='nav-item'>
            <a className='a-header' href='#'>Log in</a>
          </li>
          <li className='nav-item'>
            <a className='a-header' href='#'>Sign up</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
