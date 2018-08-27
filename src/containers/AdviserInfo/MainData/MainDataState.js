import { adviserMainData as translations } from '../../../translations/translations';
import { FORM_ELEMENT_TYPES as formElementsConfig } from '../../../constants/constants';

const mainDataState = {
  formFields: {
    basisData: [
      {
        key: 'category',
        label: translations.categoryFieldTitle,
        elementType: formElementsConfig.select,
        nameKey: 'displayValue',
        config: {
          placeholder: translations.answerTypeFieldPlaceholder,
          options: []
        },
        value: '',
        errorMsg: translations.categoryRequiredErrorMsg,
        validationRequired: true,
        error: false,
        touched: '',
        required: true
      },
      {
        key: 'name',
        label: translations.nameFieldTitle,
        elementType: formElementsConfig.input,
        config: {
          type: formElementsConfig.inputTypes.text,
          placeholder: translations.nameFieldPlaceHolder
        },
        value: '',
        error: false,
        errorMsg: translations.nameRequiredErrorMsg,
        validationRequired: true,
        touched: '',
        required: true
      },
      {
        key: 'url',
        label: translations.urlFieldTitle,
        elementType: formElementsConfig.input,
        config: {
          type: formElementsConfig.inputTypes.text,
          placeholder: translations.urlFieldPlaceHolder
        },
        value: '',
        error: false,
        errorMsg: translations.URLRequiredErrorMsg,
        validationRequired: true,
        touched: '',
        required: true
      },
      {
        key: 'image',
        label: translations.imageFieldTitle,
        elementType: formElementsConfig.filePicker,
        imageName: '',
        value: '',
        error: false,
        validationRequired: false,
        tooltip: translations.uploadImageTooltip
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
        value: '',
        touched: '',
        validationRequired: false
      },
      {
        key: 'description',
        label: translations.descriptionFieldTitle,
        elementType: formElementsConfig.textArea,
        config: {
          placeholder: translations.descriptionFieldPlaceHolder
        },
        value: '',
        touched: '',
        validationRequired: false
      },
      {
        key: 'index',
        label: translations.indexFieldTitle,
        elementType: formElementsConfig.checkbox,
        value: false,
        config: {
          type: formElementsConfig.checkbox
        },
        validationRequired: false
      },
      {
        key: 'follow',
        label: translations.followIndexTitle,
        elementType: formElementsConfig.checkbox,
        value: false,
        config: {
          type: formElementsConfig.checkbox
        },
        validationRequired: false
      }
    ]
  }
};

export default mainDataState;
