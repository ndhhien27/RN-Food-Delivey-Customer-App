/* eslint-disable import/prefer-default-export */
import * as notificationTypes from '../constants/notificationTypes';

export const markAsRead = notiId => {
  return {
    type: notificationTypes.MARK_AS_READ,
    payload: {
      notiId,
    },
  };
};

export const deleteNoti = notiId => {
  return {
    type: notificationTypes.DELETE_NOTI,
    payload: {
      notiId,
    },
  };
};
