import React from 'react';
import AsyncSelectCustom from '../Header/AsyncSelect';

const LocationTab = () => {
  return (
    <div>
      <h2>Country/Region</h2>
      <AsyncSelectCustom />
      <h2>City</h2>
    </div>
  );
};

export default LocationTab;
