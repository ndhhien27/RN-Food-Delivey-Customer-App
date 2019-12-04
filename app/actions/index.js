/* eslint-disable import/prefer-default-export */
import * as types from '../constants';

export const fetchAllRestaurant = () => {
  return {
    type: types.FETCHING_RESTAURANT,
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

export const login = (email, password) => {
  return {
    type: types.LOGIN,
    payload: {
      email,
      password,
    },
  };
};

export const getUserInfo = userId => {
  return {
    type: types.GET_USER_INFO,
    payload: {
      userId,
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
