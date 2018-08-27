import React from 'react';

import PlusButton from '../../../../PlusButton/PlusButton';
import ReactFileReader from 'react-file-reader';
import classes from './FilePickerEmpty.scss';

const filePickerEmpty = props => {
  return (
    <div className={classes.FilePicker}>
      <div className={classes.Wrapper}>
        <ReactFileReader base64={true} handleFiles={props.fileChanged}>
          <div className={classes.AddButton}>
            <PlusButton border="unset" />
          </div>
        </ReactFileReader>
      </div>
      <div className={classes.AddLabel}>{props.emptyLabel}</div>
    </div>
  );
};

export default filePickerEmpty;
