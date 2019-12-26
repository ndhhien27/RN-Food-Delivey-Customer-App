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
    case types.CLEAR_CART:
      return {
        ...state,
        cart: state.cart.filter(el => el.restaurantId !== payload.restaurantId),
      };
    case types.DELETE_CART:
      return {
        ...state,
        cart: state.cart.filter(el => el.restaurantId !== payload.restaurantId),
      };
    default:
      return state;
  }
};
