import * as types from '../constants';

const initialState = {
  isLoading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
