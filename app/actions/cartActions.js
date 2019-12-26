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

export const clearCart = restaurantId => {
  return {
    type: types.CLEAR_CART,
    payload: {
      restaurantId,
    },
  };
};

export const deleteCart = cartIndex => {
  return {
    type: types.DELETE_CART,
    payload: {
      cartIndex,
    },
  };
};
