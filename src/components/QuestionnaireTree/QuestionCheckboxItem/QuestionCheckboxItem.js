import React from 'react';

import classes from './QuestionCheckboxItem.scss';
import items from '../../../styles/components/_switch-item.scss';
import { idGenerator } from '../../../helpers/helpers';
import { colorGenerator } from '../../../helpers/helpers';
import Answer from '../Answer/Answer';

const QuestionCheckboxItem = props => {
  const borderTopColor = props.questionColor || props.parentData.color;
  const answers = props.answers.map((answer, index) => {
    return (
      <Answer
        key={idGenerator()}
        type={props.type}
        txt={answer.txt}
        isSelected={answer.isSelected}
        checkAnswer={props.checkAnswer}
        stepIndex={props.stepIndex}
        questionId={props.questionId}
        answerId={answer.id}
      />
    );
  });
  return (
    <div className={`${items.SwitchItem} ${classes.QuestionCheckboxItem}`}>
      <div
        className={classes.BorderTop}
        style={{
          backgroundColor: `${borderTopColor}`
        }}
      />
      <div className={classes.QuestionContent}>
        <div className={classes.QuestionGroupName}>
          <div className={classes.GroupImage} />
          <span>{props.groupName}</span>
        </div>
        <div className={classes.GroupDescription}>{props.groupDescription}</div>
        <div className={classes.QuesstionText}>{props.txt}</div>
        {answers}
      </div>
    </div>
  );
};

export default QuestionCheckboxItem;
