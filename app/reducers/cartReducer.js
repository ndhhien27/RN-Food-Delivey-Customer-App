import * as types from '../constants';

const initialState = {
  cart: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SAVE_NEW_CART:
      return {
        ...state,
        cart: payload.newCart,
      };
    default:
      return state;
  }
};
