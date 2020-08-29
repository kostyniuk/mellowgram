import React from 'react';

import AsyncSelect from 'react-select/async';

import useFetch from '../../hooks/useFetch';

import { colorStyles } from './colorStylesSelect';

const addColorToUser = (users) =>
  users.map((user) => ({ ...user, color: 'grey' }));

const adjustCountry = (countries) =>
  countries.map((country) => ({
    value: country.code,
    label: country.name,
  }));
const adjustCity = (cities) =>
  cities.map((city) => ({
    value: city.regionCode,
    label: city.name,
  }));

const adjustToShowSelectValues = (data, type = '') => {
  const lower = type.toLowerCase();

  if (lower === 'country') return adjustCountry(data);
  if (lower === 'city') return adjustCity(data);

  return data;
};

const AsyncSelectCustom = ({
  handler,
  urlToFetch,
  type,
  noOptionsMessage = '',
  requestParams = {},
  isDisabled = false,
}) => {
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

    const url = urlToFetch + inputValue;

    let data = await debounce(500, request.bind(null, url, requestParams));

    if (type.includes('RAPID')) {
      data = adjustToShowSelectValues(data.data, type.split('RAPID_API_')[1]);
    }

    const coloredData = addColorToUser(data);

    return coloredData;
  };

  return (
    <AsyncSelect
      isDisabled={isDisabled}
      placeholder='Search...'
      cacheOptions
      styles={colorStyles}
      noOptionsMessage={() => noOptionsMessage}
      loadOptions={promiseOptions}
      onChange={handler}
    />
  );
};

export default AsyncSelectCustom;
