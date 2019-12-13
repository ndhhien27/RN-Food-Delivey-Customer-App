/* eslint-disable no-underscore-dangle */
import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import * as notificationTypes from '../constants/notificationTypes';
import API from '../services/NotificationService';
import { navigate } from '../services/NavigationService';

function* taskNotification(action) {
  const { payload } = action;
  const res = yield call(API.getNotification, payload.userId);
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

function* notificationSaga() {
  yield takeLatest(notificationTypes.FETCHING_NOTIFICATION, taskNotification);
  yield takeLatest(notificationTypes.MARK_AS_READ, taskMarkAsRead);
}

export default notificationSaga;
