import React from 'react';

import '../styles/settingsDropdown.css';
import { Redirect } from 'react-router-dom';

const Select = ({ id, label, defaultVal, options }) => {
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState('');

  if (select) return <Redirect to={`/settings/${select}`} />;

  console.log({ select });

  const setSelected = (opt) => {
    options.each((val) => {
      val.selected = false;
    });
    opt.selected = true;
    setSelect(opt.text);
  };

  return (
    <div className='fieldset'>
      <div className='form-element'>
        <span>
          <select id={id}>
            {options.map((option) => (
              <option value={option.value} data-display-text={option.display}>
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
    tabindex='0'
  >
    <span class='current'>{selected}</span>
    <div class='list'>
      <ul>
        {options.map((option) => (
          <li
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
