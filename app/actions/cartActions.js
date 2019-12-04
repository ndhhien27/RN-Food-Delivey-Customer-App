/* eslint-disable import/prefer-default-export */
import * as types from '../constants';

export const saveNewCart = newCart => {
  return {
    type: types.SAVE_NEW_CART,
    payload: {
      newCart,
    },
  };
};

export const modifyCart = childCart => {
  return {
    type: types.MODIFY_CART,
    payload: {
      childCart,
    },
  };
};
