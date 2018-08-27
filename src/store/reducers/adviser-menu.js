import {
  ADD,
  REMOVE,
  LIST_CREATE,
  ADD_ADVISOR_ID
} from '../../constants/action-types';

export const adviserMenu = (state, action) => {
  switch (action.type) {
    case ADD: {
      const adviserList = [...state.adviserList];
      adviserList.push({
        title: action.payload.title,
        key: action.payload.key
      });

      return {
        ...state,
        adviserList: adviserList,
        title: action.payload.title
      };
    }
    case LIST_CREATE: {
      return {
        ...state,
        adviserList: [...action.payload.list],
        wasAdviserListUpdated: true
      };
    }
    case REMOVE: {
      const adviserList = [...state.adviserList];
      let removedIndex;
      adviserList.forEach((element, index) => {
        if (element.id === action.payload.id) {
          removedIndex = index;
          return false;
        }
      });
      adviserList.splice(removedIndex, 1);

      return { ...state, adviserList: adviserList };
    }
    case ADD_ADVISOR_ID: {
      return {
        ...state,
        activeAdviser: action.payload.id
      };
    }
    default:
      return state;
  }
};
