import React from 'react';

import classes from './FilePickerImageAttached.scss';

const filePickerImageAttached = props => {
  return (
    <div className={classes.FilePicker}>
      <a className={classes.ImageName}>{props.imageName}</a>
      <div className={classes.CheckMarkWrapper}>
        <div className={classes.CheckMark} />
      </div>
      <div
        className={`${classes.Icon} ${classes.RemoveButton}`}
        onClick={props.removeImage}
      />
    </div>
  );
};

export default filePickerImageAttached;
