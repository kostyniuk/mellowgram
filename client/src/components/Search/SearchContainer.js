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
import { rapidApiHeaders } from '../../helpers';
import { useSelector } from 'react-redux';

const SearchContainer = () => {
  const { request } = useFetch();

  const loggedInUser = useSelector((state) => state.loggedInUser);

  const reqParams = rapidApiHeaders();

  const [country, setCountry] = useState({ code: null, name: null });
  const [city, setCity] = useState({ code: null, name: null });

  const [interests, setInterests] = useState([]);

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [matchAll, setMatchAll] = useState(false);
  const [matchMyInterests, setMatchMyInterests] = useState(false);

  // const [maxDistance, setMaxDistance] = useState(null);
  const [noDistance, setNoDistance] = useState({
    checkedCountry: false,
    checkedCity: false,
  });

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

  const handleCountry = (e) => {
    const value = e?.value;
    const label = e?.value;

    setCountry({ code: value, name: label });
    setCity({ code: null, name: null });
  };

  const handleCity = (e) => {
    const value = e?.value;
    const label = e?.label;
    setCity({ code: value, name: label });
  };

  const addInterestsIds = (interests) => {
    let s = '';

    interests.forEach((val, i, arr) => {
      s += val.interest_id;
      if (arr.length !== i + 1) s += ',';
    });

    return s;
  };

  const isMatchAll = (bool) => (bool ? '?matchAll=true' : '?matchAll=false');

  const distinguishLocation = ({ noDistance, country, city, myLocation }) => {
    let s = '';

    if (Object.values(noDistance).includes(true)) {
      if (noDistance.checkedCountry)
        s += `&country=${myLocation.split(', ')[1]}`;
      if (noDistance.checkedCity) s += `&city=${myLocation.split(', ')[0]}`;
    } else {
      if (country.code) s += `&country=${country.code}`;
      if (city.name) s += `&city=${city.name}`;
    }

    if (!s) s += '&country=any&city=any';

    return s;
  };

  const formUrl = ({
    base = 'api/search',
    country,
    city,
    selectedInterests,
    matchAll,
    matchMyInterests,
    noDistance,
    myLocation,
  }) => {
    let s = base + '?interests=';

    const interestsFinal = matchMyInterests
      ? loggedInUser.interests
      : selectedInterests;

    s += addInterestsIds(interestsFinal);
    s += isMatchAll(matchAll);
    s += distinguishLocation({
      noDistance,
      country,
      city,
      myLocation,
    });

    console.log({ interestsFinal, s });
  };

  const searchHandler = async () => {
    const url = formUrl({
      base: 'api/search',
      country,
      city,
      selectedInterests,
      matchAll,
      matchMyInterests,
      noDistance,
      myLocation: loggedInUser.based_in,
    });
    // const res = await request();?
  };

  const handleRadioChange = (e, handler) => handler(e.target.checked);

  // const slideHandler = (_, val) => setMaxDistance(val);

  const formatGroupLabel = (data) => (
    <div style={styles.groupStyles}>
      <span>{data.label}</span>
      <span style={styles.groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

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
            {!matchMyInterests && (
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
            )}
            <RadioSingle
              state={matchMyInterests}
              handleChange={(e) => handleRadioChange(e, setMatchMyInterests)}
              label='Select mine'
            />
            <RadioSingle
              state={matchAll}
              handleChange={(e) => handleRadioChange(e, setMatchAll)}
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
                <div
                  style={{
                    backgroundColor:
                      noDistance.checkedCity || noDistance.checkedCountry
                        ? 'black'
                        : 'white',
                  }}
                >
                  <AsyncSelectCustom
                    urlToFetch='https://wft-geo-db.p.rapidapi.com/v1/geo/countries?namePrefix='
                    handler={handleCountry}
                    type='RAPID_API_COUNTRY'
                    requestParams={reqParams}
                    noOptionsMessage='No such country'
                    isDisabled={
                      noDistance.checkedCity || noDistance.checkedCountry
                    }
                  />
                </div>
              </div>
              <div className='SEARCH_LOCATION_CITY'>
                <h4>City</h4>
                <div
                  style={{
                    backgroundColor:
                      !country.code ||
                      noDistance.checkedCity ||
                      noDistance.checkedCountry
                        ? 'black'
                        : 'white',
                  }}
                >
                  <AsyncSelectCustom
                    urlToFetch={`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=${country.code}&namePrefix=`}
                    handler={handleCity}
                    type='RAPID_API_CITY'
                    requestParams={reqParams}
                    noOptionsMessage='No such city'
                    isDisabled={
                      !country.code ||
                      noDistance.checkedCity ||
                      noDistance.checkedCountry
                    }
                  />
                </div>
              </div>
              <Radio state={noDistance} handler={setNoDistance} />
            </div>
          </div>
          <button className='green' onClick={searchHandler}>
            Search
          </button>
          <hr></hr>
        </div>
        <SearchResult />
      </div>
      <div className='SEARCH_SIDE'></div>
    </div>
  );
};

export default SearchContainer;
