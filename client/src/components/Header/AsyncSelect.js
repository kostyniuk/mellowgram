import React from 'react';


import AsyncSelect from 'react-select/async';

import useFetch from '../../hooks/useFetch';

import {colorStyles} from './colorStylesSelect'  

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
      styles={colorStyles}
      noOptionsMessage={() => 'No such user'}
      loadOptions={promiseOptions}
      onChange={handler}
    />
  );
};

export default AsyncSelectCustom;
