import { combineReducers } from 'redux';
import restaurantReducer from './restaurantReducer';
import uiReducer from './uiReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  restaurantReducer,
  uiReducer,
  cartReducer,
  authReducer,
  orderReducer,
  notificationReducer,
});

export default rootReducer;
