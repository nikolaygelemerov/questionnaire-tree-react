import React from 'react';
import classes from '../Tooltip/Tooltip.scss';

const Tooltip = props => {
  const tooltip = props.text ? (
    <div className={classes.Tooltip} data-tooltip={props.text}>
      <div className={classes.Image} />
    </div>
  ) : null;
  return tooltip;
};

export default Tooltip;
