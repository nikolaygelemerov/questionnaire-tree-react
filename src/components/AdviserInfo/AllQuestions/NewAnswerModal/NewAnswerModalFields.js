import {
  CREATE_ANSWER,
  FORM_ELEMENT_TYPES as formElementsConfig
} from '../../../../constants/constants';
import { createAnswer as translations } from '../../../../translations/translations';

export const answerFields = [
  {
    key: 'answer',
    validationRequired: true,
    required: true,
    touched: '',
    error: false,
    label: translations.answerText,
    elementType: formElementsConfig.input,
    config: {
      type: formElementsConfig.inputTypes.text,
      placeholder: translations.answerTextPlaceholder
    },
    value: '',
    maxLength: 150,
    errorMsg: translations.charachtersExceededErrorMsg
  },
  {
    key: 'additionalText',
    label: translations.answerAdditionalText,
    elementType: formElementsConfig.textArea,
    config: {
      placeholder: translations.answerAdditionalTextPlaceholder
    },
    value: '',
    error: false,
    validationRequired: true,
    maxLength: 200,
    touched: '',
    errorMsg: translations.charachtersExceededErrorMsg
  },
  {
    key: CREATE_ANSWER.imageField,
    label: translations.answerImage,
    elementType: formElementsConfig.filePicker,
    imageName: '',
    value: '',
    tooltip: translations.answerImageTooltip
  }
];

export const answerFieldsSlider = [
  {
    key: 'additionalText',
    label: translations.answerAdditionalText,
    elementType: formElementsConfig.textArea,
    config: {
      placeholder: translations.answerAdditionalTextPlaceholder
    },
    value: '',
    error: false,
    validationRequired: true,
    maxLength: 200,
    errorMsg: translations.charachtersExceededErrorMsg
  }
];
