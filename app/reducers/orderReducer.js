/* eslint-disable no-underscore-dangle */
import * as types from '../constants';

const initialState = {
  myOrders: [],
  newOrder: null,
  error: null,
  createOrderError: null,
  updateOrderError: null,
  orderDetail: null,
  fetchOrderByIdError: null,
  reviewError: null,
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
    case types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        myOrders: state.myOrders.map(order =>
          order._id === payload.orderHasUpdated._id
            ? { ...order, status: payload.orderHasUpdated.status }
            : { ...order }
        ),
      };
    case types.UPDATE_ORDER_ERROR:
      return {
        ...state,
        createOrderError: payload.error,
      };
    case types.GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        orderDetail: payload.orderDetail,
      };
    case types.GET_ORDER_BY_ID_ERROR:
      return {
        ...state,
        fetchOrderByIdError: payload.error,
      };
    case types.CLEAR_ORDER_INFO:
      return {
        ...state,
        orderDetail: null,
      };
    case types.REVIEW_ORDER_SUCCESS:
      return {
        ...state,
        orderDetail: {
          ...state.orderDetail,
          review: {
            star: payload.newOrder.review.star,
            description: payload.newOrder.review.description,
          },
        },
      };
    case types.REVIEW_ORDER_ERROR:
      return {
        ...state,
        reviewError: payload.error,
      };
    default:
      return state;
  }
};
