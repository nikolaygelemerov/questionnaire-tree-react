import React from 'react';

import classes from './PlusButton.scss';

const PlusButton = props => {
  return (
    <div
      className={classes.PlusButton}
      style={{ backgroundColor: `${props.backgroundColor || '#ff7100'}` }}
    >
      <div
        className={`${classes.Bar} ${classes.Horizontal}`}
        style={{ backgroundColor: `${props.elementColor || '#fff'}` }}
      />
      <div
        className={`${classes.Bar} ${classes.Vertical}`}
        style={{ backgroundColor: `${props.elementColor || '#fff'}` }}
      />
    </div>
  );
};

export default PlusButton;
