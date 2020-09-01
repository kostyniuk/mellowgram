import React, { useState, useCallback, useEffect } from 'react';

import Select from 'react-select';

import styles from '../../styles/select';
import '../../styles/search.css';
import useFetch from '../../hooks/useFetch';
import Slider from './Slider';
import Radio from './Radio';
import RadioSingle from './RadioSingle';
import SearchResult from './SearchResult';
import AsyncSelectCustom from '../Header/AsyncSelect';

const SearchContainer = () => {
  const { request } = useFetch();

  const reqParams = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': localStorage.getItem('RAPID_API_KEY'),
    },
  };

  const [interests, setInterests] = useState([]);

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [matchAll, setMatchAll] = useState(false);

  const [maxDistance, setMaxDistance] = useState(null);
  const [noDistance, setNoDistance] = useState({
    checkedCountry: false,
    checkedCity: false,
  });

  const handleMatchAll = (e) => e.target.checked;

  const slideHandler = (_, val) => setMaxDistance(val);

  const formatGroupLabel = (data) => (
    <div style={styles.groupStyles}>
      <span>{data.label}</span>
      <span style={styles.groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  const fetchInterests = useCallback(async () => {
    const responce = await request('/api/interest');
    if (responce.success) {
      const { interests } = responce;

      const labels = Array.from(
        new Set(interests.map((interest) => interest.interest_category))
      );

      const groupedOptions = labels.map((interest_category) => {
        let optionsCurrent = interests.filter(
          (interest) => interest.interest_category === interest_category
        );

        optionsCurrent = optionsCurrent.map((interest) => ({
          id: interest.interest_id,
          value: interest.interest_name,
          label: `${interest.interest_emoji} ${interest.interest_name}`,
          color: interest.interest_color,
        }));

        return {
          label: interest_category,
          options: optionsCurrent,
        };
      });

      setInterests(groupedOptions);
    }
  }, [request]);

  useEffect(() => {
    fetchInterests();
  }, [fetchInterests]);

  if (!interests.length) return null;

  return (
    <div className='SEARCH_CONTAINER'>
      <div className='SEARCH_SIDE'></div>
      <div className='SEARCH_BODY'>
        <div className='SEARCH_TITLE'>
          <h1>Explore People</h1>
        </div>
        <div className='SEARCH_OPTIONS'>
          <div className='SEARCH_OPTIONS_SEARCH'>
            <h3>Interests: </h3>
            <Select
              isMulti
              styles={styles.colourStyles}
              name='colors'
              options={interests}
              formatGroupLabel={formatGroupLabel}
              className='basic-multi-select'
              classNamePrefix='select'
              onChange={(e) => setSelectedInterests(e)}
            />
            <RadioSingle
              state={matchAll}
              handleChange={handleMatchAll}
              label='Match all'
            />
          </div>
          <div className='SEARCH_OPTIONS_LOCATION'>
            {/* <h4>The location radius within which to find: </h4>
            <div className='SEARCH_OPTIONS_LOCATION_SLIDER'> */}
            {/* <Slider
                slideHandler={slideHandler}
                min={0}
                max={1000}
                isDisabled={noDistance.checkedCountry || noDistance.checkedCity}
              />
              <h3 style={{ margin: '5px 20px' }}>km</h3>
            </div> */}

            <div className='SEARCH_LOCATION'>
              <div className='SEARCH_LOCATION_COUNTRY'>
                <h4>Country/Region</h4>
                <div style={{ backgroundColor: 'white' }}>
                  <AsyncSelectCustom
                    urlToFetch='https://wft-geo-db.p.rapidapi.com/v1/geo/countries?namePrefix='
                    // handler={handleCountry}
                    type='RAPID_API_COUNTRY'
                    requestParams={reqParams}
                    noOptionsMessage='No such country'
                  />
                </div>
              </div>
              <div className='SEARCH_LOCATION_CITY'>
                <h4>City</h4>
                <div
                  style={{
                    backgroundColor: 'white',
                  }}
                >
                  <AsyncSelectCustom
                    // urlToFetch={`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=${country.code}&namePrefix=`}
                    // handler={handleCity}
                    type='RAPID_API_CITY'
                    requestParams={reqParams}
                    noOptionsMessage='No such city'
                    // isDisabled={!country.code}
                  />
                </div>
              </div>
              <Radio state={noDistance} handler={setNoDistance} />
            </div>
          </div>
          <button className='green'>Search</button>
          <hr></hr>
        </div>
        <SearchResult />
      </div>
      <div className='SEARCH_SIDE'></div>
    </div>
  );
};

export default SearchContainer;
