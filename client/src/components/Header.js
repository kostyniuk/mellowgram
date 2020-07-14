import React from 'react';

import '../styles/header.css';

import { TextField, InputAdornment, withStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const Header = () => {
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
      color: 'white',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
  })(TextField);

  return (
    <div>
      <nav className='header-nav'>
        <div className='hamburger'>
          <span className='line'></span>
          <span className='line'></span>
          <span className='line'></span>
        </div>
        <div class='logo'>
          <a className='a-header' href='/'>
            Mellowgram
          </a>
        </div>
        <ul className='nav-search'>
          <li className='nav-item search-field'>
            <StyledTextField
              onKeyPress={searchHandler}
              color="white"
              // className={classes}
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
        <ul className='nav-items'>
          <li className='nav-item'>
            <a className='a-header' href='#'>
              About us
            </a>
          </li>
          <li>|</li>
          <li className='nav-item'>
            <a className='a-header' href='#'>
              Log in
            </a>
          </li>
          <li className='nav-item'>
            <a className='a-header' href='#'>
              Sign up
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
