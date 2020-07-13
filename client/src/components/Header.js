import React from 'react';

import '../styles/header.css';

const Header = () => {
  return (
    <div>
      <nav>
        <div className='hamburger'>
          <span className='line'></span>
          <span className='line'></span>
          <span className='line'></span>
        </div>
        <div class='logo'>
        <img src={process.env.PUBLIC_URL + '/apple-icon-60x60.png'} />
        <a href='/' >Mellowgram</a>
        </div>
        <ul className='nav-items'>
          <li className='nav-item'>
            <a href='#'>About us</a>
          </li>
          <li>|</li>
          <li className='nav-item'>
            <a href='#'>Log in</a>
          </li>
          <li className='nav-item'>
            <a href='#'>Sign up</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
