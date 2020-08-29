import React, { useState } from 'react';

import useFetch from '../../hooks/useFetch';

import AsyncSelectCustom from '../Header/AsyncSelect';

import '../../styles/locationTab.css';

const LocationTab = () => {
  const { request } = useFetch();

  const reqParams = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': localStorage.getItem('RAPID_API_KEY'),
    },
  };

  const [country, setCountry] = useState({ code: null, name: null });
  const [city, setCity] = useState(null);

  console.log({ country, city });

  const handleCountry = (e) => {
    setCountry({ code: e.value, name: e.label });
    setCity(null);
  };

  const handleCity = (e) => {
    setCity({ code: e.value, name: e.label });
  };

  const sendLocation = async () => {
    if (country && city) {
      const location = `${city.name}, ${country.name}`;
      const res = await request('/api/user/location', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location }),
      });

      console.log({ res });
    }
  };

  return (
    <div className='LOCATION_TAB_CONTAINER'>
      <div className='LOCATION_TAB_COUNTRY'>
        <h1>Country/Region</h1>
        <div style={{ backgroundColor: 'white' }}>
          <AsyncSelectCustom
            urlToFetch='https://wft-geo-db.p.rapidapi.com/v1/geo/countries?namePrefix='
            handler={handleCountry}
            type='RAPID_API_COUNTRY'
            requestParams={reqParams}
            noOptionsMessage='No such country'
          />
        </div>
      </div>
      <div className='LOCATION_TAB_CITY'>
        <h1>City</h1>
        <div style={{ backgroundColor: country.name ? 'white' : 'inherit' }}>
          <AsyncSelectCustom
            urlToFetch={`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=${country.code}&namePrefix=`}
            handler={handleCity}
            type='RAPID_API_CITY'
            requestParams={reqParams}
            noOptionsMessage='No such city'
            isDisabled={!country.code}
          />
        </div>
      </div>
      <div className='LOCATION_TAB_SUBMIT'>
        <button className='green' onClick={sendLocation}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default LocationTab;
