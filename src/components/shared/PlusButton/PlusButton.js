import React from 'react';

import classes from './PlusButton.scss';

const PlusButton = props => {
  return (
    <div
      className={classes.PlusButton}
      style={{
        border: `${props.border || '1px solid'}`,
        backgroundColor: `${props.backgroundColor || '#ff7100'}`,
        borderColor: `${props.borderColor || 'transparent'}`
      }}
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
