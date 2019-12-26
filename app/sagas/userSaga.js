import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import * as types from '../constants';
import UserAPI from '../services/UserService';

const userId = state => state.auth.userId;

function* taskBookmark({ payload }) {
  const userIdValue = yield select(userId);
  const res = yield call(UserAPI.bookmark, payload.restId, userIdValue);
  if (res.data) {
    yield put({
      type: types.BOOKMARK_SUCCESS,
      payload: {
        restId: payload.restId,
        userId: userIdValue,
      },
    });
  } else if (res.errors) {
    const { message } = res.errors[0];
    yield put({
      type: types.BOOKMARK_ERROR,
      payload: {
        error: message,
      },
    });
  }
}

function* userSaga() {
  yield takeLatest(types.BOOKMARK, taskBookmark);
}

export default userSaga;
