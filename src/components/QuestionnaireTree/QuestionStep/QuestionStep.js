import React, { PureComponent } from 'react';

import classes from './QuestionStep.scss';

class QuestionStep extends PureComponent {
  render() {
    return <div className={classes.QuestionStep}>{this.props.children}</div>;
  }
}

export default QuestionStep;
