import * as types from '../constants';

const initialState = {
  fullList: [],
  restaurantInfo: {},
  error: null,
  isLoading: false,
  searchResult: [],
  reviews: [],
  fetchReviewError: null,
  bookmarkError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FETCHING_RESTAURANT_SUCCESS:
      return {
        ...state,
        fullList: payload.data,
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
    case types.CLEAR_REST_INFO:
      return {
        ...state,
        restaurantInfo: {},
      };
    case types.CLEAR_SEARCH:
      return {
        ...state,
        searchResult: [],
      };
    case types.FETCHING_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: payload.reviews,
      };
    case types.FETCHING_REVIEW_ERROR:
      return {
        ...state,
        fetchReviewError: payload.error,
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
