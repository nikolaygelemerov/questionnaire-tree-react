import React from 'react';

import classes from './TextArea.scss';
import { VALIDATION } from '../../../../../constants/constants';

const textArea = props => {
  let errorClass = null;
  if (props.touched === VALIDATION.touched) {
    errorClass =
      props.error === VALIDATION.error ? classes.Error : classes.Valid;
  }
  return (
    <textarea className={`${classes.TextArea} ${errorClass}`} {...props} />
  );
};

export default textArea;
