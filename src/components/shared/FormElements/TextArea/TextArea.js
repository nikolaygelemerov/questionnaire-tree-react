import React from 'react';

import classes from './TextArea.scss';

const textArea = props => {
  return <textarea className={classes.TextArea} {...props} />;
};

export default textArea;
