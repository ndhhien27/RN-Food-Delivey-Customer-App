import { fork } from 'redux-saga/effects';
import restaurantSaga from './restaurantSaga';
import cartSaga from './cartSaga';
import authSaga from './authSaga';
import orderSaga from './orderSaga';

// function* demoSaga() {
//   console.log('saga');
// }

function* rootSaga() {
  yield fork(restaurantSaga);
  yield fork(cartSaga);
  yield fork(authSaga);
  yield fork(orderSaga);
}

export default rootSaga;
