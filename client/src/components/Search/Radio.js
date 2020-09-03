import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color='default' {...props} />);

export default ({ state, handler, isDisabled }) => {
  const [disabledCountry, setDisabledCountry] = useState(false);

  const handleChange = (event) => {
    const { name, checked } = event.target;

    if (name === 'checkedCity' && checked === true) {
      handler((prev) => {
        for (const radio in prev) {
          prev[radio] = true;
        }
        return { ...prev };
      });
    } else {
      handler((prev) => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  return (
    <FormGroup row>
      {(!state.checkedCity && !isDisabled) && (
        <FormControlLabel
          disabled={state.checkedCity}
          control={
            <GreenCheckbox
              checked={state.checkedCountry}
              onChange={handleChange}
              name='checkedCountry'
            />
          }
          label='Only my country'
        />
      )}

      {!isDisabled && (
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.checkedCity}
              onChange={handleChange}
              name='checkedCity'
            />
          }
          label='Only my city'
        />
      )}
    </FormGroup>
  );
};
