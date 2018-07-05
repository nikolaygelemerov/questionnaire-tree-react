import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './ActionButton.scss';
import { BUTTON_TYPES } from '../../../constants/constants';

const ActionButton = props => {
  const content = props.navigateTo ? (
    <div
      className={`${classes.ActionButton} ${classes[props.addClass]}`}
      onClick={props.clicked}
    >
      <NavLink to={props.route}>{props.title}</NavLink>
    </div>
  ) : (
    <button
      className={`${classes.ActionButton} ${classes[props.addClass]}`}
      onClick={props.clicked}
      type={props.type || BUTTON_TYPES.button}
    >
      {props.title}
    </button>
  );

  return content;
};

export default ActionButton;
