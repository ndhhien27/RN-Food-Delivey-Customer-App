/* eslint-disable import/prefer-default-export */
import * as types from '../constants';

export const fetchingMyOrder = userId => {
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
