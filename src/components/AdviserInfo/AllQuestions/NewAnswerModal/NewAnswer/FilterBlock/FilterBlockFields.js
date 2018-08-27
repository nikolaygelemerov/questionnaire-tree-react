import { FORM_ELEMENT_TYPES as formElementsConfig } from '../../../../../../constants/constants';
import { createAnswer as translations } from '../../../../../../translations/translations';

export const propertyGroupField = {
  hidden: false,
  key: 'propertyGroup',
  label: translations.filterPropertyGroupText,
  elementType: formElementsConfig.select,
  config: {
    placeholder: translations.filterPropertyGroupPlaceHolder,
    options: []
  },
  value: '',
  required: true,
  validationRequired: true
};
export const propertyField = {
  hidden: true,
  key: 'property',
  label: translations.filterPropertyText,
  elementType: formElementsConfig.select,
  config: {
    placeholder: translations.filterPropertyPlaceholder,
    options: []
  },
  value: '',
  required: true,
  validationRequired: true
};

export const propertyOptionsField = {
  hidden: false,
  key: 'options',
  nameKey: 'value',
  label: translations.optionsPropertyText,
  elementType: formElementsConfig.multiSelect,
  config: {
    placeholder: translations.optionsPropertyPlaceholder,
    options: []
  },
  value: '',
  required: true,
  validationRequired: true
};

export const minField = {
  hidden: false,
  styles: {
    inline: true,
    labelWidth: '50%',
    elementWidth: '45%'
  },
  key: 'min',
  label: translations.min,
  elementType: formElementsConfig.input,
  config: {},
  value: '',
  required: true,
  validationRequired: true
};

export const maxField = {
  hidden: false,
  styles: {
    inline: true,
    labelWidth: '6%',
    elementWidth: '45%'
  },
  key: 'max',
  label: translations.max,
  elementType: formElementsConfig.input,
  config: {},
  value: ''
};

export const suffixField = {
  hidden: false,
  styles: {
    elementWidth: '18%'
  },
  key: 'suffix',
  label: translations.suffix,
  elementType: formElementsConfig.input,
  config: {},
  value: '',
  required: true,
  validationRequired: true
};
