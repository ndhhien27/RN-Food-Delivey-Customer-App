import * as types from '../constants';
import * as notificationTypes from '../constants/notificationTypes';

const initialState = {
  authToken: null,
  userId: null,
  userInfo: {},
  loginError: null,
  getUserError: null,
  fcmToken: null,
  uniqueId: null,
  updateUserError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        authToken: payload.authToken,
        userId: payload.userId,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        loginError: payload.error,
      };
    case types.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: payload.userInfo,
      };
    case types.GET_USER_INFO_ERROR:
      return {
        ...state,
        getUserError: payload.error,
      };
    case types.GET_DEVICE_TOKEN:
      return {
        ...state,
        fcmToken: payload.fcmToken,
        uniqueId: payload.uniqueId,
      };
    case types.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: payload.userInfo,
      };
    case types.UPDATE_USER_INFO_ERROR:
      return {
        ...state,
        updateUserError: payload.error,
      };
    case notificationTypes.UPDATE_WITH_FCM:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          numNotification: state.userInfo.numNotification + 1,
        },
      };
    default:
      return state;
  }
};
