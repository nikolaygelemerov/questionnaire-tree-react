import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './ActionButton.scss';
import { BUTTON_TYPES } from '../../../constants/constants';

const ActionButton = props => {
  const classDisabled = props.disabled ? classes.Disabled : '';
  const content = props.navigateTo ? (
    <div
      disabled={props.disabled}
      className={`${classes.ActionButton} ${
        classes[props.addClass]
      }${classDisabled}`}
      onClick={props.clicked}
    >
      <NavLink to={props.route}>{props.title}</NavLink>
    </div>
  ) : (
    <button
      className={`${classes.ActionButton} ${classes.ActionButtonWithPadding} ${
        classes[props.addClass]
      }${classDisabled}`}
      onClick={props.clicked}
      type={props.type || BUTTON_TYPES.button}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );

  return content;
};

export default ActionButton;
