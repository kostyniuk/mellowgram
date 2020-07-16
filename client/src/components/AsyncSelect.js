import React, { Component, useState } from 'react';

import AsyncSelect from 'react-select/async';

const AsyncSelectCustom = ({ handler }) => {
  
  const promiseOptions = async (inputValue) => {
    return await (async () => {
      const res = await fetch(`/api/findUser/${inputValue}`);
      const json = await res.json();
      console.log({ json });
      return json;
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
