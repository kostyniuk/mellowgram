import React from 'react';

import AsyncSelect from 'react-select/async';

import useFetch from '../../hooks/useFetch';

const AsyncSelectCustom = ({ handler }) => {
  const { request } = useFetch();
  let timeId = null;

  const promiseOptions = async (inputValue) => {
    const debounce = (timeout, callback) =>
      new Promise((resolve) => {
        clearTimeout(timeId);
        timeId = setTimeout(async () => {
          const responce = await callback();
          resolve(responce);
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
      noOptionsMessage={() => 'No such user'}
      loadOptions={promiseOptions}
      onChange={handler}
    />
  );
};

export default AsyncSelectCustom;
