import { call, put, takeLatest, delay } from 'redux-saga/effects';
import * as types from '../constants';
import API from '../services/OrderService';

function* taskGetOrder({ payload }) {
  const res = yield call(API.getOrderByUser, payload.userId);
  if (res.errors) {
    const { message } = res.errors;
    yield put({
      type: types.FETCHING_MY_ORDER_ERROR,
      payload: {
        error: message,
      },
    });
  } else if (res.data.orderByUser) {
    yield put({
      type: types.FETCHING_MY_ORDER_SUCCESS,
      payload: {
        myOrders: res.data.orderByUser,
      },
    });
  }
}

function* taskCreateOrder({ payload }) {
  const res = yield call(API.createOrder, payload.orderDetail);
  if (res.errors) {
    const { message } = res.errors;
    yield put({
      type: types.CREATE_ORDER_ERROR,
      payload: {
        error: message,
      },
    });
  } else if (res.data.createOrder) {
    yield put({
      type: types.CREATE_ORDER_SUCCESS,
      payload: {
        myOrders: res.data.createOrder,
      },
    });
  }
}

function* orderSaga() {
  yield takeLatest(types.FETCHING_MY_ORDER, taskGetOrder);
  yield takeLatest(types.CREATE_ORDER, taskCreateOrder);
}

export default orderSaga;
