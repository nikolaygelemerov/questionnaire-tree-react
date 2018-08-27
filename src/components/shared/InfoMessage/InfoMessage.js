import React from 'react';

import classes from './InfoMessage.scss';
import { idGenerator } from '../../../services/helpers';

const InfoMessage = props => {
  let details;
  if (
    Array.isArray(props.infoMsg.details) &&
    props.infoMsg.details.length > 1
  ) {
    details = (
      <ul>
        {props.infoMsg.details.map(detail => (
          <li key={idGenerator()}>{detail}</li>
        ))}
      </ul>
    );
  } else {
    details = <li>{props.infoMsg.details}</li>;
  }
  return (
    <div className={props.success ? classes.Success : classes.Error}>
      {props.infoMsg.title ? (
        <h2 className={props.success ? classes.SuccessMsg : classes.ErrorMsg}>
          {props.infoMsg.title}
        </h2>
      ) : null}
      <div
        className={
          props.success ? classes.SuccessDetails : classes.ErrorDetails
        }
      >
        {details}
      </div>
    </div>
  );
};

export default InfoMessage;
