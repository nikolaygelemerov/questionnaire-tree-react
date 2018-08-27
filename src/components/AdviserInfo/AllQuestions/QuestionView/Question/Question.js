import React from 'react';

import classes from './Question.scss';

import QuestionAnswer from './QuestionAnswer/QuestionAnswer';
import { idGenerator } from '../../../../../services/helpers';

const Question = props => {
  return (
    <div className={classes.QuestionCard} key={idGenerator()}>
      <h4>{props.question}</h4>

      {props.answers.map(answer => {
        if (props.disableAnswers) {
          answer.disable = props.disableAnswers;
        }
        if (props.answerType) {
          answer.type = props.answerType;
        }
        answer['isSelected'] = false;
        answer['checkAnswer'] = answer.checkAnswer || function() {};
        return (
          <div key={answer.id} className={classes.Answer}>
            <QuestionAnswer key={idGenerator()} {...answer} />
          </div>
        );
      })}
    </div>
  );
};

export default Question;
