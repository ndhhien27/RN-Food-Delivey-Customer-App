/* eslint-disable import/prefer-default-export */
import * as types from '../constants';
import * as notificationTypes from '../constants/notificationTypes';

export const fetchAllRestaurant = (userLocation = null) => {
  return {
    type: types.FETCHING_RESTAURANT,
    payload: {
      userLocation,
    },
  };
};

export const fetchRestaurantById = restaurantId => {
  return {
    type: types.FETCHING_RESTAURANT_BY_ID,
    payload: {
      restaurantId,
      isLoading: true,
    },
  };
};

export const login = loginInput => {
  return {
    type: types.LOGIN,
    payload: {
      loginInput,
    },
  };
};

export const getUserInfo = (userId, token) => {
  return {
    type: types.GET_USER_INFO,
    payload: {
      userId,
      token,
    },
  };
};

export const search = param => {
  return {
    type: types.SEARCH_RESTAURANT,
    payload: {
      param,
    },
  };
};

export const getNotification = (userId = null) => {
  return {
    type: types.FETCHING_NOTIFICATION,
    payload: {
      userId,
    },
  };
};

export const getDeviceInfo = (fcmToken, uniqueId) => {
  return {
    type: types.GET_DEVICE_TOKEN,
    payload: {
      fcmToken,
      uniqueId,
    },
  };
};

export const updateUser = (userId, updateValue) => {
  return {
    type: types.UPDATE_USER_INFO,
    payload: {
      userId,
      updateValue,
    },
  };
};

export const updateWithFCM = newNoti => {
  return {
    type: notificationTypes.UPDATE_WITH_FCM,
    payload: {
      newNoti,
    },
  };
};

export const signOut = () => {
  return {
    type: types.SIGN_OUT,
  };
};

export const clearRestInfo = () => {
  return {
    type: types.CLEAR_REST_INFO,
  };
};

export const signUp = userInput => {
  return {
    type: types.SIGN_UP,
    payload: {
      userInput,
    },
  };
};

export const getCurrentLocation = (lat, long) => {
  return {
    type: types.GET_CURRENT_LOCATION,
    payload: {
      lat,
      long,
    },
  };
};

export const clearSearch = () => {
  return {
    type: types.CLEAR_SEARCH,
  };
};

export const fetchingReview = restId => {
  return {
    type: types.FETCHING_REVIEW,
    payload: {
      restId,
    },
  };
};
