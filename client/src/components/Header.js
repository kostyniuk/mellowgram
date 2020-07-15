import React, { useState } from 'react';

import '../styles/header.css';

import { TextField, InputAdornment, withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Hamburger = ({ handler }) => {
  return (
    <div className='hamburger' onClick={handler}>
      <span className='line'></span>
      <span className='line'></span>
      <span className='line'></span>
    </div>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleHamburger = () => {
    setOpen((prev) => !prev);
  };

  const searchHandler = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter is pressed');
    }
    return;
  };

  const StyledTextField = withStyles({
    root: {
      background: '#ebe6e7',
      borderRadius: 3,
      border: 0,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  })(TextField);

  return (
    <div>
      <nav className='header-nav'>
        <Hamburger handler={handleHamburger} />
        <div className='logo'>
          <a className='a-header' href='/'>
            Mellowgram
          </a>
        </div>
        <ul className='nav-search'>
          <li className='nav-item search-field'>
            <StyledTextField
              onKeyPress={searchHandler}
              id='input-with-icon-textfield'
              variant='outlined'
              placeholder='Search'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </li>
        </ul>
        <ul className={open ? 'nav-items show' : 'nav-items'}>
          <li className={open ? 'nav-item fade' : 'nav-item'}>
            <a className='a-header' href='#'>
              About us
            </a>
          </li>
          <li className={open ? 'disabled' : ''}>|</li>
          <li className={open ? 'nav-item fade' : 'nav-item'}>
            <a className='a-header' href='/login'>
              Log in
            </a>
          </li>
          <li className={open ? 'nav-item fade' : 'nav-item'}>
            <a className='a-header' href='/signup'>
              Sign up
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
