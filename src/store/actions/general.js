import {
  SHOW_MODAL,
  CLEAR_TITLE,
  CHECK_EDITABLE_FORM
} from '../../constants/action-types';

export const checkForEditedForm = (isFormEdited, callback) => {
  return {
    type: CHECK_EDITABLE_FORM,
    name: 'general',
    payload: {
      isFormEdited: isFormEdited
    },
    callback: callback
  };
};

export const showPromptModal = (isFormEdited, callback) => {
  return {
    type: SHOW_MODAL,
    name: 'general',
    payload: {
      showPromptModal: isFormEdited
    },
    callback: callback
  };
};

export const clearTitle = () => {
  return {
    type: CLEAR_TITLE,
    name: 'general',
    payload: {
      title: ''
    }
  };
};
