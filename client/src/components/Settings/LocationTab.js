import React, { useState } from 'react';

import useFetch from '../../hooks/useFetch';

import AsyncSelectCustom from '../Header/AsyncSelect';

import '../../styles/locationTab.css';
import { rapidApiHeaders } from '../../helpers';
import { useDispatch } from 'react-redux';
import { editAuth } from '../../redux/actions';

const LocationTab = () => {
  const { request } = useFetch();
  const dispatch = useDispatch();

  const reqParams = rapidApiHeaders();

  const [country, setCountry] = useState({ code: null, name: null });
  const [city, setCity] = useState(null);
  const [updatedLocation, setUpdatedLocation] = useState(false);
  const [error, setError] = useState('');

  const handleCountry = (e) => {
    setCountry({ code: e.value, name: e.label });
    setCity(null);
  };

  const handleCity = (e) => {
    if (!e) return setError('No city provided');
    setCity({ code: e.value, name: e.label });
    return setError('');
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

      if (res.success) {
        setUpdatedLocation(true);
        dispatch(editAuth({ updatedFields: { based_in: location } }));
        setTimeout(() => setUpdatedLocation(false), 3000);
      }
    } else {
      setError("City or country isn't provided");
    }
  };

  console.log({ country, city });

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
        {error && <h2 style={{ color: 'grey' }}>{error}</h2>}
        {updatedLocation && <h2 style={{ color: 'white' }}>Updated</h2>}
        <button className='green' onClick={sendLocation}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default LocationTab;
