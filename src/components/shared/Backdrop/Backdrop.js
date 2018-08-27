import React from 'react';

import classes from './Backdrop.scss';
import { BACKDROP } from '../../../constants/constants';

const backdrop = props =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked} type={BACKDROP} />
  ) : null;

export default backdrop;
