/* eslint-disable no-underscore-dangle */
import * as notificationTypes from '../constants/notificationTypes';

const initialState = {
  notifications: [],
  error: null,
  deleteError: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case notificationTypes.FETCHING_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: payload.notifications,
      };
    case notificationTypes.FETCHING_NOTIFICATION_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    case notificationTypes.MARK_AS_READ_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.map(el =>
          el._id === payload.newNotification._id
            ? { ...el, hasRead: true }
            : { ...el }
        ),
      };
    case notificationTypes.MARK_AS_READ_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    case notificationTypes.UPDATE_WITH_FCM:
      return {
        ...state,
        notifications: [payload.newNoti, ...state.notifications],
      };
    case notificationTypes.DELETE_NOTI_ERROR:
      return {
        ...state,
        deleteError: payload.error,
      };
    case notificationTypes.DELETE_NOTI_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(
          el => el._id !== payload.notiHasDelete._id
        ),
      };
    default:
      return state;
  }
};
