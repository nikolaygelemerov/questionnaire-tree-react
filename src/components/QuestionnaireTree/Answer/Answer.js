import React from 'react';

import classes from './Answer.scss';
import PlusButton from '../../shared/PlusButton/PlusButton';
import { QUESTIONNAIRE_TREE } from '../../../constants/constants';

const Answer = props => {
  const inputClass =
    props.type === QUESTIONNAIRE_TREE.typeCheckbox
      ? classes.InputCheckbox
      : classes.InputRadio;

  const displayArrow = props.isParent && !props.canCreate;
  const displayPlus =
    (props.isParent && props.canCreate) ||
    (!props.isParent &&
      (props.type === QUESTIONNAIRE_TREE.typeSlider ||
        props.type === QUESTIONNAIRE_TREE.typeCheckbox));

  return (
    <div className={classes.Answer}>
      <div className={classes.AnswerTextWrapper}>
        <label
          className={inputClass}
          style={{
            display:
              props.type !== QUESTIONNAIRE_TREE.typeSlider ? 'block' : 'none'
          }}
        >
          <input
            disabled={props.type === QUESTIONNAIRE_TREE.typeCheckbox}
            type="checkbox"
            onChange={props.checkAnswer}
            checked={
              props.isParent && props.type !== QUESTIONNAIRE_TREE.typeCheckbox
            }
          />
          <span className={classes.Checkmark} />
        </label>
        <div
          className={classes.AnswerTextContent}
          style={{
            borderRight:
              props.isParent && props.type !== QUESTIONNAIRE_TREE.typeSlider
                ? `4px solid ${props.color}`
                : `1px solid ${QUESTIONNAIRE_TREE.defaultBorderColor}`
          }}
        >
          <div className={classes.AnswerText}>
            <span
              style={{
                display:
                  props.type !== QUESTIONNAIRE_TREE.typeSlider
                    ? 'block'
                    : 'none'
              }}
            >
              {props.answer || 'Answer text here...'}
            </span>
            {displayArrow && (
              <div
                className={classes.AnswerArrow}
                style={{
                  borderColor: props.color,
                  backgroundColor: props.isActiveAnswer ? props.color : 'none'
                }}
                onClick={props.toggleQuestionHeight}
              >
                <div className={classes.ArrowWrapper}>
                  <span
                    className={classes.Arrow}
                    style={{
                      borderColor: props.isActiveAnswer
                        ? QUESTIONNAIRE_TREE.activeAnswerBorderColor
                        : props.color
                    }}
                  />
                </div>
              </div>
            )}
            {displayPlus && (
              <div
                className={classes.AnswerArrow}
                style={{
                  border: 'none'
                }}
                onClick={() => props.fetchQuestions({ ...props })}
              >
                <PlusButton
                  borderColor={props.color}
                  backgroundColor={`${
                    props.activeCreateChild
                      ? props.color
                      : QUESTIONNAIRE_TREE.inactiveBackgroundColor
                  }`}
                  elementColor={`${
                    props.activeCreateChild
                      ? QUESTIONNAIRE_TREE.activeAnswerBorderColor
                      : props.color
                  }`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;
