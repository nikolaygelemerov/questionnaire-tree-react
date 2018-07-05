import React from 'react';

import classes from './Select.scss';

const select = props => {
  return (
    <select
      className={classes.Select}
      value={props.value}
      onChange={props.onChange}
    >
      {props.options.map(option => {
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

export default select;
