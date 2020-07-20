import React from 'react';

import '../../styles/settingsDropdown.css';
import { useHistory, Redirect } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Select = ({ id, label, defaultVal, options }) => {
  const history = useHistory();
  const { error, request } = useFetch();

  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState('');

  const logoutHandler = async () => {
    const json = await request('/api/logout');
    console.log({ json });
    history.push('/');
    window.location.reload(true);
  };

  if (select === 'Account') {
    return <Redirect exact to='/account' />;
  }

  if (select === 'Log Out') {
    logoutHandler();
  }

  return (
    <div className='fieldset'>
      <div className='form-element a-header'>
        <span>
          <select id={id}>
            {options.map((option, i) => (
              <option
                value={option.value}
                key={i}
                data-display-text={option.display}
              >
                {option.text}
              </option>
            ))}
          </select>
          <Dropdown
            options={options}
            isOpen={open}
            toggleOpen={() => setOpen(!open)}
            selected={defaultVal}
            setSelected={setSelect}
          />
        </span>
      </div>
    </div>
  );
};

const Dropdown = ({ options, isOpen, toggleOpen, selected, setSelected }) => (
  <div
    className={`dropdown${isOpen ? ' open' : ''}`}
    onClick={toggleOpen}
    tabIndex='0'
  >
    <span className='current'>{selected}</span>
    <div className='list'>
      <ul>
        {options.map((option, i) => (
          <li
            key={i}
            className={`option${option.text === selected ? ' selected' : ''}`}
            data-value={option.value}
            data-display-text={option.display}
            onClick={() => setSelected(option.text)}
          >
            {option.text}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default Select;
