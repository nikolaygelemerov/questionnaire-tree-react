import { ADD, REMOVE, LIST_CREATE } from '../../constants/action-types';
import { idGenerator } from '../../services/helpers';

export const addAdviser = (title, callback) => {
  return {
    type: ADD,
    name: 'adviserMenu',
    payload: {
      title: title,
      key: idGenerator()
    },
    callback: callback
  };
};

export const createAdviserList = (advisers, callback) => {
  return {
    type: LIST_CREATE,
    name: 'adviserMenu',
    payload: {
      list: advisers.map(element => {
        return {
          title: element.name,
          id: element.id,
          image: element.image,
          isActive: element.isActive,
          key: idGenerator()
        };
      })
    },
    callback: callback
  };
};

export const removeAdviser = (id, callback) => {
  return {
    type: REMOVE,
    name: 'adviserMenu',
    payload: {
      id: id
    },
    callback: callback
  };
};
