import * as types from '../constants';

const initialState = {
  fullList: [],
  restaurantInfo: {},
  error: null,
  isLoading: false,
  searchResult: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCHING_RESTAURANT_SUCCESS:
      return {
        ...state,
        fullList: payload.data,
        idLoading: false,
      };
    case types.FETCHING_RESTAURANT_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    case types.FETCHING_RESTAURANT_BY_ID_SUCCESS:
      console.log(payload);
      return {
        ...state,
        restaurantInfo: payload.data,
        isLoading: false,
      };
    case types.FETCHING_RESTAURANT_BY_ID_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    case types.SEARCH_RESTAURANT_SUCCESS:
      return {
        ...state,
        searchResult: payload.searchResult,
      };
    case types.SEARCH_RESTAURANT_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};
