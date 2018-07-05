import React from 'react';

import classes from './Input.scss';

const input = props => {
  return <input className={classes.Input} {...props} />;
};

export default input;
