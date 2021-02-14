import React, {useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '50%',
  },
});

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default ({ slideHandler, min, max, initialRange, isDisabled }) => {
  const classes = useStyles();

  function valuetext(value) {
    return `${value}°C`;
  }

  if (initialRange[1] === `${max}+`) initialRange[1] = max;

  return (
    <div className={classes.root}>
      <PrettoSlider
        disabled={isDisabled}
        aria-labelledby="range-slider"
        value={initialRange}
        // aria-labelledby='discrete-slider'
        valueLabelDisplay='auto'
        step={1}
        getAriaValueText={valuetext}
        min={min}
        max={max}
        onChange={slideHandler}
      />
    </div>
  );
};
