import { fork } from 'redux-saga/effects';
import restaurantSaga from './restaurantSaga';
import cartSaga from './cartSaga';
import authSaga from './authSaga';
import orderSaga from './orderSaga';
import notificationSaga from './notificationSaga';
import userSaga from './userSaga';

// function* demoSaga() {
//   console.log('saga');
// }

function* rootSaga() {
  yield fork(restaurantSaga);
  yield fork(cartSaga);
  yield fork(authSaga);
  yield fork(orderSaga);
  yield fork(notificationSaga);
  yield fork(userSaga);
}

export default rootSaga;
