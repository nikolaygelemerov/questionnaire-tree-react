import React from 'react';

import classes from './Input.scss';
import { VALIDATION } from '../../../../../constants/constants';

const input = props => {
  let errorClass = null;
  if (props.touched === VALIDATION.touched) {
    errorClass =
      props.error === VALIDATION.error ? classes.Error : classes.Valid;
  }
  return <input className={`${classes.Input} ${errorClass}`} {...props} />;
};

export default input;
