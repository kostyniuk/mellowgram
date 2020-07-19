import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/header.css';
import Select from '../components/SettingsDropdown';

import AsyncSelect from '../components/AsyncSelect';

const categoryOptions = [
  { text: 'Business', value: 'business', selected: false },
  { text: 'Celebrity', value: 'celebrity', selected: false },
  { text: 'Culture', value: 'culture', selected: false },
  { text: 'Entertainment', value: 'entertainment', selected: false },
  { text: 'Games', value: 'games', selected: false },
  { text: 'Lifestyle', value: 'lifestyle', selected: false },
  { text: 'Tech', value: 'tech', selected: false },
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

const Header = () => {
  const history = useHistory();

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

  if (selectedValue) {
    history.push(`/${selectedValue}`);
    return window.location.reload(true);
  }

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
            {/* <a className='a-header' href='/signup'> */}
            {/* Sign up */} */}
            {/* <i class="fa fa-cog" aria-hidden="true"></i> */}
            <Select
              id='settings'
              label='Settings'
              defaultVal='Settings'
              options={categoryOptions}
            />
            {/* </a> */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
