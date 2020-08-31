import React, { useState, useEffect, useCallback } from 'react';

import useFetch from '../../../hooks/useFetch';

import Select from 'react-select';
import { useSelector } from 'react-redux';

import styles from '../../../styles/select';

const SelectInterests = ({ setSelectActivities }) => {
  const loggedInInterests = useSelector(
    (state) => state.loggedInUser.interests
  );

  const [alreadyInterests, setAlreadyInterests] = useState({
    loaded: false,
    data: [],
  });

  const { request } = useFetch();

  const [interests, setInterests] = useState([]);

  const distinguishAlreadyInterests = useCallback(() => {
    const loggedInInterestsIds = loggedInInterests.map(
      (myInterest) => +myInterest.interest_id
    );
    interests.map((section, i, arr) => {
      const { options } = section;

      const filtered = options.filter((interest) =>
        loggedInInterestsIds.includes(+interest.id)
      );

      if (i !== arr.length - 1) {
        filtered.map((interest, index, interests) => {
          setAlreadyInterests((prev) => ({
            ...prev,
            data: [...prev.data, interest],
          }));
        });
      } else {
        if (!filtered.length) {
          setAlreadyInterests((prev) => ({ ...prev, loaded: true }));
        } else {
          filtered.map((interest, index, interests) => {
            setAlreadyInterests((prev) => ({
              ...prev,
              loaded: true,
              data: [...prev.data, interest],
            }));
          });
        }
      }
    });
  }, [loggedInInterests, interests]);

  useEffect(() => {
    distinguishAlreadyInterests();
  }, [distinguishAlreadyInterests]);

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

  if (!interests || !alreadyInterests.loaded) return null;

  return (
    <div>
      <Select
        defaultValue={!alreadyInterests.fetched ? alreadyInterests.data : []}
        isMulti
        styles={styles.colourStyles}
        name='colors'
        options={interests}
        formatGroupLabel={formatGroupLabel}
        className='basic-multi-select'
        classNamePrefix='select'
        onChange={(e) => setSelectActivities(e)}
      />
    </div>
  );
};

export default SelectInterests;
