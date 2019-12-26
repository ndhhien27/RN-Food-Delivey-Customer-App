import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';
import restaurantReducer from './restaurantReducer';
import uiReducer from './uiReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import orderReducer from './orderReducer';
import notificationReducer from './notificationReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['authToken', 'userId'],
  stateReconciler: autoMergeLevel2,
};

const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
  whitelist: ['cart'],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  restaurantReducer,
  uiReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  orderReducer,
  notificationReducer,
});

export default rootReducer;
