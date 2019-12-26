/* eslint-disable import/prefer-default-export */
import * as types from '../constants';

export const bookmark = restId => {
  return {
    type: types.BOOKMARK,
    payload: {
      restId,
    },
  };
};
