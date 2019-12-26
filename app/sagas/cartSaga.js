import { call, put, takeLatest, delay, select } from 'redux-saga/effects';
import * as types from '../constants';
import { modifyArr } from '../helpers/array';

const cartSelector = state => state.cart.cart || [];

function* taskUpdateNewCart(action) {
  const { payload } = action;
  const currentCart = yield select(cartSelector);
  const newCart = modifyArr(currentCart, payload.childCart);
  yield put({
    type: types.SAVE_NEW_CART,
    payload: {
      newCart,
    },
  });
}

function* cartSaga() {
  yield takeLatest(types.MODIFY_CART, taskUpdateNewCart);
}

export default cartSaga;
