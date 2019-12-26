import * as types from '../constants';
import * as notificationTypes from '../constants/notificationTypes';

const initialState = {
  authToken: '',
  userId: '',
  userInfo: {},
  loginError: null,
  getUserError: null,
  fcmToken: null,
  uniqueId: null,
  updateUserError: null,
  signUpError: null,
  bookmarkError: null,
  currentLocation: {
    lat: null,
    long: null,
  },
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
    case types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        authToken: '',
        userId: '',
      };
    case types.SIGN_OUT_ERROR:
      return {
        ...state,
        signOutError: payload.error,
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
      };
    case types.SIGN_UP_ERROR:
      return {
        ...state,
        signUpError: payload.error,
      };
    case types.GET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: {
          lat: payload.lat,
          long: payload.long,
        },
      };
    case types.BOOKMARK_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          bookmarks: [...state.userInfo.bookmarks, payload.restId],
        },
      };
    case types.BOOKMARK_ERROR:
      return {
        ...state,
        bookmarkError: payload.error,
      };
    default:
      return state;
  }
};
