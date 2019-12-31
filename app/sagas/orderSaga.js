/* eslint-disable no-alert */
/* eslint-disable no-undef */
import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import * as types from '../constants';
import API from '../services/OrderService';
import { clearCart } from '../actions/cartActions';
import { fetchAllRestaurant } from '../actions';

// const userId = state => state.auth.userId;

function* taskGetOrder({ payload }) {
  yield put({
    type: types.SHOW_LOADING,
  });
  const auth = yield call(AsyncStorage.getItem, 'persist:auth');
  const authParse = JSON.parse(auth);
  const userIdValue = JSON.parse(authParse.userId);
  // const userIdValue = yield select(userId);
  const res = yield call(API.getOrderByUser, payload.userId || userIdValue);
  if (res.errors) {
    const { message } = res.errors[0];
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
  yield delay(500);
  yield put({
    type: types.HIDE_LOADING,
  });
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
    yield put(clearCart(payload.orderDetail.restaurantId));
  }
}

function* taskUpdateOrder({ payload }) {
  const res = yield call(API.updateOrder, payload.orderId, payload.status);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: types.UPDATE_ORDER_ERROR,
      payload: {
        error: message,
      },
    });
    // yield delay(1500);
    // yield put({
    //   type: types.HIDE_LOADING,
    // });
    alert(message);
    // alert(message);
  } else if (res.data.updateOrder) {
    yield put({
      type: types.UPDATE_ORDER_SUCCESS,
      payload: {
        orderHasUpdated: res.data.updateOrder,
      },
    });
  }
}

function* taskFetchOrderById({ payload }) {
  const res = yield call(API.fetchOrderById, payload.orderId);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: types.GET_ORDER_BY_ID_ERROR,
      payload: {
        error: message,
      },
    });
    // yield delay(1500);
    // yield put({
    //   type: types.HIDE_LOADING,
    // });
    alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.orderById) {
    yield put({
      type: types.GET_ORDER_BY_ID_SUCCESS,
      payload: {
        orderDetail: res.data.orderById,
      },
    });
  }
}

function* taskReviewOrder({ payload }) {
  const res = yield call(API.reviewOrder, payload.orderId, payload.reviewInfo);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: types.REVIEW_ORDER_ERROR,
      payload: {
        error: message,
      },
    });
    // yield delay(1500);
    // yield put({
    //   type: types.HIDE_LOADING,
    // });
    alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.reviewOrder) {
    const { reviewOrder } = res.data;
    yield put({
      type: types.REVIEW_ORDER_SUCCESS,
      payload: {
        newOrder: reviewOrder,
      },
    });
    yield put(fetchAllRestaurant());
    Alert.alert('Thanks for your review');
  }
}

function* orderSaga() {
  yield takeLatest(types.FETCHING_MY_ORDER, taskGetOrder);
  yield takeLatest(types.CREATE_ORDER, taskCreateOrder);
  yield takeLatest(types.GET_ORDER_BY_ID, taskFetchOrderById);
  yield takeLatest(types.UPDATE_ORDER, taskUpdateOrder);
  yield takeLatest(types.REVIEW_ORDER, taskReviewOrder);
}

export default orderSaga;
