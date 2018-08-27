import {
  CHECK_EDITABLE_FORM,
  SHOW_MODAL,
  CLEAR_TITLE
} from '../../constants/action-types';

export const general = (state, action) => {
  switch (action.type) {
    case CHECK_EDITABLE_FORM: {
      return {
        ...state,
        isFormEdited: action.payload.isFormEdited
      };
    }
    case SHOW_MODAL: {
      return {
        ...state,
        showPromptModal: action.payload.showPromptModal
      };
    }
    case CLEAR_TITLE: {
      return {
        ...state,
        title: action.payload.title
      };
    }
    default:
      return state;
  }
};
