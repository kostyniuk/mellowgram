import React, { useState, useEffect } from 'react';

import useFetch from '../hooks/useFetch';

import Select from 'react-select';
import chroma from 'chroma-js';

const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
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
  { value: 'strawberry', label: 'Strawberry', rating: 'wild', color: '#666666' },
  { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy', color: '#666666' },
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

const SelectInterests = () => {
  const handler = (e) => {
    console.log(e);
  };

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'black' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      console.log({ data });

      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? 'black'
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : 'black',
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
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
  };

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'black',
    fontSize: '1.1rem',
  };
  const groupBadgeStyles = {
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
  };

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  // const [interests, setInterests] =

  return (
    <div>
      <Select
        defaultValue={[colourOptions[2], colourOptions[3]]}
        isMulti
        styles={colourStyles}
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
