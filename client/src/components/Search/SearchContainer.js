import React, { useState, useCallback, useEffect } from 'react';

import Select from 'react-select';

import styles from '../../styles/select';
import '../../styles/search.css';
import useFetch from '../../hooks/useFetch';
import Slider from './Slider';
import Radio from './Radio';

const SearchContainer = () => {
  const { request } = useFetch();

  const [interests, setInterests] = useState([]);

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [maxDistance, setMaxDistance] = useState(null);
  const [noDistance, setNoDistance] = useState({
    checkedCountry: false,
    checkedCity: false,
  });

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
          </div>
          <div className='SEARCH_OPTIONS_LOCATION'>
            <h4>The location radius within which to find: </h4>
            <div className='SEARCH_OPTIONS_LOCATION_SLIDER'>
              <Slider
                slideHandler={slideHandler}
                min={0}
                max={1000}
                isDisabled={noDistance.checkedCountry || noDistance.checkedCity}
              />
              <h3 style={{ margin: '5px 20px' }}>km</h3>
            </div>
            <Radio state={noDistance} handler={setNoDistance} />
          </div>
        </div>
      </div>
      <div className='SEARCH_SIDE'></div>
    </div>
  );
};

export default SearchContainer;
