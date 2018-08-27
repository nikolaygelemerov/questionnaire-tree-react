import React from 'react';

import FilterBlock from './FilterBlock/FilterBlock';
import PlusButtonSmall from '../../../../shared/PlusButtonSmall/PlusButtonSmall';
import FormElement from '../../../../shared/Form/FormElements/FormElement';
import styles from './NewAnswer.scss';
import { createAnswer as translations } from '../../../../../translations/translations';
import {
  CREATE_ANSWER,
  QUESTION,
  VALIDATION,
  FORM_ELEMENT_TYPES
} from '../../../../../constants/constants';

const NewAnswer = props => {
  const formElements = props.formFields.answerFields.map(element => {
    if (element.key === CREATE_ANSWER.imageField) {
      element.tooltip =
        props.questionType.id === QUESTION.typeRadio
          ? translations.answerImageTooltipRadio
          : translations.answerImageTooltipCheckbox;
    }
    return (
      <FormElement
        validationRequired={element.validationRequired}
        touched={element.touched}
        error={element.error ? VALIDATION.error : VALIDATION.valid}
        required={element.required ? element.required : false}
        changed={event => props.changed(event, element.key, 'answerFields')}
        key={element.key}
        label={element.label}
        elementType={element.elementType}
        elementConfig={element.config}
        imageName={element.imageName}
        value={element.value}
        tooltip={element.tooltip ? element.tooltip : ''}
        info={
          element.elementType !== FORM_ELEMENT_TYPES.filePicker
            ? `${element.value.length} / ${element.maxLength} ${
                translations.characters
              }${
                element.error && element.value.length > 0
                  ? ` - ${element.errorMsg}`
                  : ''
              }`
            : null
        }
        emptyLabel={props.emptyLabel}
      />
    );
  });

  const filters = props.formFields.filters.map(element => {
    return (
      <FilterBlock
        isSlider={props.isSlider}
        key={element.id}
        filterFieldChange={props.filterFieldChange}
        deleteFilter={props.deleteFilter}
        name={element.name}
        filter={element}
      />
    );
  });

  return (
    <div className={styles.FormWrapper}>
      <div className={styles.ContentTitle}>
        {translations.modalContentTitle}
      </div>
      <div className={styles.Content}>
        <div className={styles.QuestionType}>
          {props.questionType.type} &nbsp;
          {translations.questionTypeSuffix}
        </div>
        {formElements}
        {filters}
        <PlusButtonSmall
          text={translations.addNewFilter}
          click={props.addFilter}
        />
      </div>
    </div>
  );
};

export default NewAnswer;
