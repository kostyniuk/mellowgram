import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import '../styles/header.css';

import AsyncSelect from '../components/AsyncSelect';

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
  const [selectedValue, setSelectedValue] = useState('');

  const handleHamburger = () => {
    setOpen((prev) => !prev);
  };

  const searchHandler = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter is pressed');
    }
    return;
  };

  const handleChange = (e) => {
    setSelectedValue(e.value);
  };

  // if (selectedValue) {
  //   return <Redirect to={`${selectedValue}`} />;
  // }

  console.log({ selectedValue });


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
            <AsyncSelect handler={handleChange} selectedValue={selectedValue} />
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
