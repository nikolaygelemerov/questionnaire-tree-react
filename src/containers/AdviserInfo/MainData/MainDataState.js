import { adviserMainData as translations } from '../../../translations/translations';

import { FORM_ELEMENT_TYPES as formElementsConfig } from '../../../constants/constants';

const mainDataState = {
  formFields: {
    basisData: [
      {
        key: 'category',
        label: translations.categoryFieldTitle,
        elementType: formElementsConfig.select,
        config: {
          options: []
        },
        value: ''
      },
      {
        key: 'name',
        label: translations.nameFieldTitle,
        elementType: formElementsConfig.input,
        config: {
          type: formElementsConfig.inputTypes.text,
          placeholder: translations.nameFieldPlaceHolder
        },
        value: ''
      },
      {
        key: 'url',
        label: translations.urlFieldTitle,
        elementType: formElementsConfig.input,
        config: {
          type: formElementsConfig.inputTypes.text,
          placeholder: translations.urlFieldPlaceHolder
        },
        value: ''
      }
    ],
    SEO: [
      {
        key: 'title',
        label: translations.seoFieldTitle,
        elementType: formElementsConfig.input,
        config: {
          type: formElementsConfig.inputTypes.text,
          placeholder: translations.seoFieldPlaceHolder
        },
        value: ''
      },
      {
        key: 'description',
        label: translations.descriptionFieldTitle,
        elementType: formElementsConfig.textArea,
        config: {
          placeholder: translations.descriptionFieldPlaceHolder
        },
        value: ''
      },
      {
        key: 'index',
        label: translations.indexFieldTitle,
        elementType: formElementsConfig.checkbox,
        value: false,
        config: {
          type: formElementsConfig.checkbox
        }
      },
      {
        key: 'follow',
        label: translations.followIndexTitle,
        elementType: formElementsConfig.checkbox,
        value: false,
        config: {
          type: formElementsConfig.checkbox
        }
      }
    ]
  }
};

export default mainDataState;
