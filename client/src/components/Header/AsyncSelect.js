import React from 'react';

import chroma from 'chroma-js';

import AsyncSelect from 'react-select/async';

import useFetch from '../../hooks/useFetch';

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'inherit' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    console.log({ data });

    console.log({ isSelected });

    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isFocused ? 'rgb(23, 148, 67)' : '#fff',
      color: isFocused ? '#fff' : '#000',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.2).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

const AsyncSelectCustom = ({ handler }) => {
  const { request } = useFetch();
  let timeId = null;

  const promiseOptions = async (inputValue) => {
    const debounce = (timeout, callback) =>
      new Promise((resolve) => {
        clearTimeout(timeId);
        timeId = setTimeout(async () => {
          const responce = await callback();
          console.log({ responce });
          resolve(responce.map((user) => ({ ...user, color: 'grey' })));
        }, timeout);
      });
    return await debounce(
      500,
      request.bind(null, `/api/findUser/${inputValue}`)
    );
  };

  return (
    <AsyncSelect
      placeholder='Search...'
      cacheOptions
      styles={colourStyles}
      noOptionsMessage={() => 'No such user'}
      loadOptions={promiseOptions}
      onChange={handler}
    />
  );
};

export default AsyncSelectCustom;
