import React, { useState, useEffect, useCallback } from 'react';

import useFetch from '../hooks/useFetch';

import Select from 'react-select';
import chroma from 'chroma-js';

const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC' },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

const flavourOptions = [
  { value: 'vanilla', label: 'Vanilla', rating: 'safe', color: '#666666' },
  { value: 'chocolate', label: 'Chocolate', rating: 'good', color: '#666666' },
  {
    value: 'strawberry',
    label: 'Strawberry',
    rating: 'wild',
    color: '#666666',
  },
  {
    value: 'salted-caramel',
    label: 'Salted Caramel',
    rating: 'crazy',
    color: '#666666',
  },
];

const groupedOptions = [
  {
    label: 'Colours',
    options: colourOptions,
  },
  {
    label: 'Flavours',
    options: flavourOptions,
  },
];

const styles = {
  colourStyles: {
    control: (styles) => ({ ...styles, backgroundColor: 'black' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      console.log({ data });

      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? 'rgb(44, 44, 44)'
          : isSelected
          ? data.color
          : 'rgb(44, 44, 44)',
        color: '#ccc',

        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor:
            !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.2).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  },
  groupStyles: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'black',
    fontSize: '1.1rem',
    padding: '0px',
    margin: '0px',
  },
  groupBadgeStyles: {
    backgroundColor: '#000',
    borderRadius: '2em',
    color: '#fefefe',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  },
};

const SelectInterests = () => {
  const { request } = useFetch();

  const handler = (e) => {
    console.log(e);
  };

  const formatGroupLabel = (data) => (
    <div style={styles.groupStyles}>
      <span>{data.label}</span>
      <span style={styles.groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  const [interests, setInterests] = useState([]);

  const fetchInterests = useCallback(async () => {
    const responce = await request('/api/interest');
    if (responce.success) {
      console.log(responce.interests);

      setInterests(responce.interests);
    }
  }, [request]);

  useEffect(() => {
    fetchInterests();
  }, [fetchInterests]);

  return (
    <div>
      <Select
        defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        styles={styles.colourStyles}
        name='colors'
        options={groupedOptions}
        formatGroupLabel={formatGroupLabel}
        className='basic-multi-select'
        classNamePrefix='select'
        onChange={handler}
      />
    </div>
  );
};

export default SelectInterests;
