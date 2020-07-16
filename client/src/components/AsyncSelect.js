import React, { Component, useState } from 'react';

import AsyncSelect from 'react-select/async';

import useFetch from '../hooks/useFetch';

const AsyncSelectCustom = ({ handler }) => {
  const { request } = useFetch();

  const promiseOptions = async (inputValue) => {
    return await (async () => {
      return await request(`/api/findUser/${inputValue}`);
    })();
  };

  return (
    <AsyncSelect
      placeholder='Search...'
      cacheOptions
      loadOptions={promiseOptions}
      onChange={handler}
    />
  );
};

export default AsyncSelectCustom;
