import chroma from 'chroma-js';

export default {
  colourStyles: {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
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
            !isDisabled && (isSelected ? data.color : color.alpha(0.9).css()),
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: 'black',
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: 'black',
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
