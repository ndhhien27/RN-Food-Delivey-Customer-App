import * as types from '../constants';

const initialState = {
  myOrders: [],
  newOrder: null,
  error: null,
  createOrderError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCHING_MY_ORDER_SUCCESS:
      return {
        ...state,
        myOrders: payload.myOrders,
      };
    case types.FETCHING_MY_ORDER_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        newOrder: payload.newOrder,
      };
    case types.CREATE_ORDER_ERROR:
      return {
        ...state,
        createOrderError: payload.error,
      };
    default:
      return state;
  }
};
