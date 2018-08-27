import React from 'react';

import classes from './Select.scss';
import { idGenerator } from '../../../../../services/helpers';

const select = props => {
  const selectClasses = props.value
    ? [classes.Select]
    : [classes.Select, classes.EmptySelect];
  const nameKey = props.nameKey || 'name';

  const hintOption = props.value ? null : (
    <option disabled={true} key="-1" value={''}>
      {props.placeholder}
    </option>
  );

  return (
    <select
      className={selectClasses.join(' ')}
      value={props.value}
      onChange={props.onChange}
      disabled={props.disabled}
    >
      {hintOption}
      {props.options.map(option => (
        <option key={idGenerator()} value={option.id}>
          {option[nameKey]}
        </option>
      ))}
    </select>
  );
};

export default select;
