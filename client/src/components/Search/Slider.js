import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
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

export default ({ slideHandler, min, max, isDisabled }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PrettoSlider
        disabled={isDisabled}
        defaultValue={30}
        aria-labelledby='discrete-slider'
        valueLabelDisplay='auto'
        step={10}
        min={min}
        max={max}
        onChange={slideHandler}
      />
    </div>
  );
};
