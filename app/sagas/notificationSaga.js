/* eslint-disable no-underscore-dangle */
import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import * as notificationTypes from '../constants/notificationTypes';
import * as types from '../constants';
import API from '../services/NotificationService';
import { navigate } from '../services/NavigationService';

function* taskNotification(action) {
  yield put({
    type: types.SHOW_LOADING,
  });
  const auth = yield call(AsyncStorage.getItem, 'persist:auth');
  const authParse = JSON.parse(auth);
  const userId = JSON.parse(authParse.userId);
  const { payload } = action;
  const res = yield call(API.getNotification, payload.userId || userId);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: notificationTypes.FETCHING_NOTIFICATION_ERROR,
      payload: {
        error: message,
      },
    });
  } else if (res.data.notificationByUser) {
    yield put({
      type: notificationTypes.FETCHING_NOTIFICATION_SUCCESS,
      payload: {
        notifications: res.data.notificationByUser,
      },
    });
  }
  yield delay(500);
  yield put({
    type: types.HIDE_LOADING,
  });
}

function* taskMarkAsRead(action) {
  const { payload } = action;
  const res = yield call(API.markAsRead, payload.notiId);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: notificationTypes.MARK_AS_READ_ERROR,
      payload: {
        error: message,
      },
    });
  } else if (res.data.markAsRead) {
    yield put({
      type: notificationTypes.MARK_AS_READ_SUCCESS,
      payload: {
        newNotification: res.data.markAsRead,
      },
    });
    navigate('OrderDetailScreen', { orderId: res.data.markAsRead.order._id });
  }
}

function* taskDeleteNoti(action) {
  const { payload } = action;
  const res = yield call(API.deleteNoti, payload.notiId);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: notificationTypes.DELETE_NOTI_ERROR,
      payload: {
        error: message,
      },
    });
  } else if (res.data.deleteNoti) {
    yield put({
      type: notificationTypes.DELETE_NOTI_SUCCESS,
      payload: {
        notiHasDelete: res.data.deleteNoti,
      },
    });
  }
}

function* notificationSaga() {
  yield takeLatest(notificationTypes.FETCHING_NOTIFICATION, taskNotification);
  yield takeLatest(notificationTypes.MARK_AS_READ, taskMarkAsRead);
  yield takeLatest(notificationTypes.DELETE_NOTI, taskDeleteNoti);
}

export default notificationSaga;
