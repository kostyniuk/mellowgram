import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import equal from 'deep-equal';

import Select from './SettingsDropdown';
import Badge from '../Direct/Badge';

import AsyncSelect from './AsyncSelect';
import '../../styles/header.css';

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
const getTotalUnread = (chats) =>
  chats.reduce((prev, cur) => {
    return cur.unread + prev;
  }, 0);

const Header = () => {
  const history = useHistory();
  const authorized = useSelector((state) => state.loggedInUser);

  const chats = Object.values(
    useSelector(
      (state) => state.chats,
      (prev, curr) => equal(prev, curr)
    )
  );

  const unreadCount = getTotalUnread(chats);

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
  }

  return (
    <div>
      <nav className='header-nav'>
        <Hamburger handler={handleHamburger} />
        <div className='logo'>
          <NavLink to='/'>Mellowgram</NavLink>
        </div>
        <div className='HEADER__search'>
          <ul className='nav-search'>
            <li className='nav-item search-field'>
              <AsyncSelect
                handler={handleChange}
                selectedValue={selectedValue}
              />
            </li>
          </ul>
        </div>
        <ul className={open ? 'nav-items show' : 'nav-items'}>
          <li className={open ? 'nav-item fade open' : 'nav-item'}>
            <NavLink to='/about'>About us</NavLink>
          </li>
          <li className={open ? 'disabled' : ''}>|</li>
          <li className={open ? 'nav-item fade open' : 'nav-item'}>
            {authorized.isAuthenticated ? (
              <NavLink to='/direct'>
                <div className='Header__direct'>
                  <i className='fa fa-paper-plane' aria-hidden='true'></i>
                  {unreadCount ? (
                    <Badge
                      size='smaller'
                      status='danger'
                      content={getTotalUnread(chats)}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </NavLink>
            ) : (
              <NavLink to='/login'>Login</NavLink>
            )}
          </li>
          <li className={open ? 'nav-item fade open' : 'nav-item'}>
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
