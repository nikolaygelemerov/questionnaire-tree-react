import React from 'react';

import classes from './Answer.scss';
import PlusButton from '../../shared/PlusButton/PlusButton';

const Answer = props => {
  const inputType = props.type;
  const inputClass =
    props.type === 'checkbox' ? classes.InputCheckbox : classes.InputRadio;
  return (
    <div className={classes.Answer}>
      <div
        className={classes.AnswerTextWrapper}
        style={{
          borderRight: props.isSelected
            ? `4px solid ${props.color}`
            : '1px solid #d9d9d9'
        }}
      >
        <label className={inputClass}>
          <input
            disabled={false}
            type="checkbox"
            onChange={() =>
              props.checkAnswer(
                props.stepIndex,
                props.questionId,
                props.answerId
              )
            }
            checked={props.isSelected}
          />
          <span className={classes.Checkmark} />
        </label>
      </div>
      {props.isSelected &&
        !props.canCreate && (
          <div className={classes.AnswerArrowWrapper}>
            <div
              className={classes.AnswerArrow}
              style={{
                borderColor: `${props.color}`,
                backgroundColor: props.isActive ? `${props.color}` : 'none'
              }}
              onClick={() => props.toggleQuestionHeight(props.color)}
            >
              <div className={classes.ArrowWrapper}>
                <span
                  className={classes.Arrow}
                  style={{
                    borderColor: props.isActive ? '#f6f6f6' : `${props.color}`
                  }}
                />
              </div>
            </div>
          </div>
        )}
      {props.isSelected &&
        props.canCreate && (
          <div className={classes.AnswerArrowWrapper}>
            <div
              className={classes.AnswerArrow}
              style={{
                borderColor: `${props.color}`
              }}
              onClick={() => props.addNewQuestion({ ...props })}
            >
              <PlusButton
                backgroundColor={'transparent'}
                elementColor={props.color}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default Answer;
