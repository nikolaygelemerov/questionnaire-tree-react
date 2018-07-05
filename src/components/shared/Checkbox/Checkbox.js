import React from 'react';
import PropTypes from 'prop-types';

import classes from './Checkbox.scss';
import { BUTTON_TYPES } from '../../../constants/constants';

const Checkbox = props => {
  return (
    <div className={classes.Checkbox} onClick={props.updateCheckBoxHandler}>
      <input
        type={BUTTON_TYPES.checkbox}
        checked={props.isChecked}
        onChange={() => {}}
      />
      <div className={`${classes.Slider} ${classes.Round}`}>
        <div className={classes.CircleWrapper}>
          <div className={classes.Circle} />
        </div>
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  updateCheckBoxHandler: PropTypes.func,
  isChecked: PropTypes.bool
};

export default Checkbox;
