/* eslint-disable no-undef */
/* eslint-disable no-alert */
import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import { navigate } from '../services/NavigationService';
import * as types from '../constants';
import API from '../services/AuthService';
import UserAPI from '../services/UserService';
import { getUserInfo, fetchAllRestaurant } from '../actions';

const uniqueId = state => state.auth.uniqueId;

function* taskAuth({ payload }) {
  const res = yield call(API.login2, payload.loginInput);
  yield put({
    type: types.SHOW_LOADING,
  });
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: types.LOGIN_ERROR,
      payload: {
        error: message,
      },
    });
    yield delay(1000);
    yield put({
      type: types.HIDE_LOADING,
    });
    alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.login) {
    const { userId, authToken } = res.data.login;
    yield put({
      type: types.LOGIN_SUCCESS,
      payload: {
        userId,
        authToken,
      },
    });
    yield put(getUserInfo(userId, authToken));
    yield delay(1000);
    yield put({
      type: types.HIDE_LOADING,
    });
    navigate('Main', { a: 'a' });
  }
}

function* taskSignUp({ payload }) {
  yield delay(1000);
  yield put({
    type: authTypes.SHOW_LOADING,
  });
  const res = yield call(API.signup, payload.userInput);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: types.SIGN_UP_ERROR,
      payload: {
        error: message,
      },
    });
    alert(message);
  } else if (res.data) {
    yield put({
      type: types.SIGN_UP_SUCCESS,
    });
    Alert.alert('Success', 'You have successfully registered', [
      { text: 'OK', onPress: () => goBack(null) },
    ]);
  }
  yield delay(1000);
  yield put({
    type: authTypes.HIDE_LOADING,
  });
}

function* taskGetUserInfo({ payload }) {
  const res = yield call(UserAPI.getUserInfo, payload.userId, payload.token);
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: types.GET_USER_INFO_ERROR,
      payload: {
        error: message,
      },
    });
    navigate('Auth', null);
    // yield delay(1500);
    // yield put({
    //   type: types.HIDE_LOADING,
    // });
    // alert(res.errors[0].message);
    // alert(message);
  } else if (res.data.userById) {
    yield put({
      type: types.GET_USER_INFO_SUCCESS,
      payload: {
        userInfo: res.data.userById,
      },
    });
    // yield delay(1500);
    // yield put({
    //   type: types.HIDE_LOADING,
    // });
    navigate('Main', null);
  }
}

function* taskUpdateUserInfo({ payload }) {
  const res = yield call(
    UserAPI.updateUser,
    payload.userId,
    payload.updateValue
  );
  if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: types.UPDATE_USER_INFO_ERROR,
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
  } else if (res.data.updateUser) {
    yield put({
      type: types.UPDATE_USER_INFO_SUCCESS,
      payload: {
        userInfo: res.data.updateUser,
      },
    });
  }
}

function* taskSignOut({ payload }) {
  try {
    const uniqueIdValue = yield select(uniqueId);
    yield call(AsyncStorage.clear);
    const res = yield call(UserAPI.clearDevice, uniqueIdValue);
    if (res.errors) {
      yield put({
        type: types.SIGN_OUT_ERROR,
        payload: {
          error,
        },
      });
    } else if (res.data.clearUserDeviceInfo) {
      yield put({
        type: types.SIGN_OUT_SUCCESS,
      });
    }
    navigate('Auth', null);
  } catch (error) {
    yield put({
      type: types.SIGN_OUT_ERROR,
      payload: {
        error,
      },
    });
  }
}

function* taskGetLocation({ payload }) {
  yield put(fetchAllRestaurant(payload));
}

function* authSaga() {
  yield takeLatest(types.LOGIN, taskAuth);
  yield takeLatest(types.SIGN_OUT, taskSignOut);
  yield takeLatest(types.SIGN_UP, taskSignUp);
  yield takeLatest(types.GET_USER_INFO, taskGetUserInfo);
  yield takeLatest(types.UPDATE_USER_INFO, taskUpdateUserInfo);
  yield takeLatest(types.GET_CURRENT_LOCATION, taskGetLocation);
}

export default authSaga;
