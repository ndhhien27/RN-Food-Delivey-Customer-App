import request from './request';

const getNotification = userId => {
  const data = {
    query: `
      query GetNotification($userId: ID!){
        notificationByUser(userId: $userId){
          order {
            _id
          }
          title
          createdAt
          _id
          hasRead
        }
      }
    `,
    variables: {
      userId,
    },
  };

  return request({ url: '/graphql', method: 'post', data });
};

const markAsRead = notiId => {
  const data = {
    query: `
      mutation MarkAsRead($notiId: ID!){
        markAsRead(notificationId:$notiId){
          order{
            _id
          }
          title
          createdAt
          _id
          hasRead
        }
      }
    `,
    variables: {
      notiId,
    },
  };

  return request({ url: '/graphql', method: 'post', data });
};

export default {
  getNotification,
  markAsRead,
};
