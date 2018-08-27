import { allQuestions as translations } from '../../../../translations/translations';

import {
  FORM_ELEMENT_TYPES as formElementsConfig,
  QUESTION_FIELDS
} from '../../../../constants/constants';

const newQuestionState = {
  formFields: [
    {
      key: QUESTION_FIELDS.name,
      label: translations.nameField,
      elementType: formElementsConfig.input,
      config: {
        type: formElementsConfig.inputTypes.text,
        placeholder: translations.nameFieldPlaceholder
      },
      maxLength: 30,
      value: '',
      error: false,
      touched: '',
      errorMsg: translations.charachtersExceededErrorMsg,
      tooltip: translations.nameFieldTooltip,
      required: true,
      validationRequired: true
    },
    {
      key: QUESTION_FIELDS.backendName,
      label: translations.backendNameField,
      elementType: formElementsConfig.input,
      config: {
        type: formElementsConfig.inputTypes.text,
        placeholder: translations.backendNameFieldPlaceholder
      },
      maxLength: 50,
      value: '',
      error: false,
      touched: '',
      errorMsg: translations.charachtersExceededErrorMsg,
      tooltip: translations.backendNameFieldTooltip,
      required: true,
      validationRequired: true
    },
    {
      key: QUESTION_FIELDS.question,
      label: translations.questionField,
      elementType: formElementsConfig.input,
      config: {
        type: formElementsConfig.inputTypes.text,
        placeholder: translations.questionFieldPlaceholder
      },
      maxLength: 85,
      value: '',
      error: false,
      touched: '',
      errorMsg: translations.charachtersExceededErrorMsg,
      tooltip: '',
      required: true,
      validationRequired: true,
      styles: {
        labelWidth: '184px'
      }
    },
    {
      key: QUESTION_FIELDS.answerType,
      label: translations.answerTypeField,
      elementType: formElementsConfig.select,
      nameKey: 'type',
      config: {
        placeholder: translations.answerTypeFieldPlaceholder,
        options: []
      },
      value: '',
      error: false,
      tooltip: translations.answerTypeFieldTooltip,
      required: true,
      validationRequired: true
    }
  ]
};

export default newQuestionState;
