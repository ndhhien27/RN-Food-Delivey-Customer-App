import * as types from '../constants';

const initialState = {
  authToken: null,
  userId: null,
  userInfo: {},
  loginError: null,
  getUserError: null,
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
    default:
      return state;
  }
};
