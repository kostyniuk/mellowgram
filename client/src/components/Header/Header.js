import React, { useState } from 'react';
import { Redirect, NavLink, useHistory } from 'react-router-dom';

import '../../styles/header.css';
import Select from './SettingsDropdown';

import AsyncSelect from './AsyncSelect';

const categoryOptions = [
  { text: 'Account', value: 'account', selected: false },
  { text: 'Log Out', value: 'logout', selected: false },
];

const Hamburger = ({ handler }) => {
  return (
    <div className='hamburger' onClick={handler}>
      <span className='line'></span>
      <span className='line'></span>
      <span className='line'></span>
    </div>
  );
};

const Header = ({ authorized }) => {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleHamburger = () => {
    setOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setSelectedValue(e.value);
  };

  if (selectedValue) {
    history.push(`/${selectedValue}`); // no return !!!
    // return <Redirect exact to={`/${selectedValue}`} />;
  }

  // if (!authorized) return <div></div>

  return (
    <div>
      <nav className='header-nav'>
        <Hamburger handler={handleHamburger} />
        <div className='logo'>
          <NavLink to='/'>Mellowgram</NavLink>
        </div>
        <ul className='nav-search'>
          <li className='nav-item search-field'>
            <AsyncSelect handler={handleChange} selectedValue={selectedValue} />
          </li>
        </ul>
        <ul className={open ? 'nav-items show' : 'nav-items'}>
          <li className={open ? 'nav-item fade' : 'nav-item'}>
            <NavLink to='/about'>About us</NavLink>
          </li>
          <li className={open ? 'disabled' : ''}>|</li>
          <li className={open ? 'nav-item fade' : 'nav-item'}>
            {authorized.isAuthenticated ? (
              <a>Activity</a>
            ) : (
              <NavLink to='/login'>Login</NavLink>
            )}
          </li>
          <li className={open ? 'nav-item fade' : 'nav-item'}>
            {authorized.isAuthenticated ? (
              <Select
                id='settings'
                label='Settings'
                defaultVal='Settings'
                options={categoryOptions}
              />
            ) : (
              <NavLink to='/signup'>Sign up</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
