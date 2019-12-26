/* eslint-disable import/prefer-default-export */
import * as types from '../constants';

export const fetchingMyOrder = (userId = null) => {
  return {
    type: types.FETCHING_MY_ORDER,
    payload: {
      userId,
    },
  };
};

export const createOrder = orderDetail => {
  return {
    type: types.CREATE_ORDER,
    payload: {
      orderDetail,
    },
  };
};

export const updateOrder = (orderId, status) => {
  return {
    type: types.UPDATE_ORDER,
    payload: {
      orderId,
      status,
    },
  };
};

export const fetchOrderById = orderId => {
  return {
    type: types.GET_ORDER_BY_ID,
    payload: {
      orderId,
    },
  };
};

export const clearOrderInfo = () => {
  return {
    type: types.CLEAR_ORDER_INFO,
  };
};

export const reviewOrder = (orderId, reviewInfo) => {
  return {
    type: types.REVIEW_ORDER,
    payload: {
      orderId,
      reviewInfo,
    },
  };
};
