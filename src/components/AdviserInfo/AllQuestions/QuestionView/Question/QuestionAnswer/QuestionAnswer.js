import React from 'react';

import classes from './QuestionAnswer.scss';
import {
  CREATE_ANSWER,
  QUESTIONNAIRE_TREE
} from '../../../../../../constants/constants';

const QuestionAnswer = props => {
  const sliderFilters = props.numericFilters.concat(props.specialFilters);

  const slider = (
    <div className={classes.Slider}>
      <div className={classes.SliderLine}>
        <div className={classes.SliderCircle} />
      </div>
      <div className={classes.TextsWrapper}>
        {sliderFilters[0] &&
        typeof sliderFilters[0].minPropertyValue !== 'undefined' ? (
          <div className={classes.Text}>
            <p className={classes.MinSliderValue}>
              Min: {sliderFilters[0].minPropertyValue}
            </p>
            <p className={classes.MinSliderValue}>
              {sliderFilters[0].propertyGroupName}
              {sliderFilters[0].type === CREATE_ANSWER.numericFilter
                ? `(${sliderFilters[0].propertyName})`
                : null}
            </p>
          </div>
        ) : null}
        {sliderFilters[0] && sliderFilters[0].maxPropertyValue ? (
          <div className={classes.Text}>
            <p className={classes.MaxSliderValue}>
              Max: {sliderFilters[0].maxPropertyValue}
            </p>
            <p className={classes.MaxSliderValue}>
              {sliderFilters[0].propertyGroupName}
              {sliderFilters[0].type === CREATE_ANSWER.numericFilter
                ? `(${sliderFilters[0].propertyName})`
                : null}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );

  const inputClass =
    props.type === QUESTIONNAIRE_TREE.typeCheckbox
      ? classes.InputCheckbox
      : classes.InputRadio;
  const isSlider = props.type === QUESTIONNAIRE_TREE.typeSlider;
  const content = isSlider ? (
    slider
  ) : (
    <div className={classes.Answer}>
      <div className={classes.AnswerTextWrapper}>
        <label className={inputClass}>
          <input disabled={true} type="checkbox" />
          <span className={classes.Checkmark} />
        </label>
        <div className={classes.AnswerTextContent}>
          <div className={classes.AnswerText}>
            <div>{props.answer || 'Answer text here...'}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return content;
};

export default QuestionAnswer;
