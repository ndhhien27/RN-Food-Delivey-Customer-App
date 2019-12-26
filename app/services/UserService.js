import request from './request';

const getUserInfo = (userId, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const data = {
    query: `
       query GetUserInfo($userId: ID!){
        userById(userId: $userId){
          fName
          lName
          email
          position{
            _id
            address
            lat
            long
          }
          bookmarks{
            _id
          }
          phone
          payment{
            _id
            paymentType
            detail
          }
          numNotification
        }
      }
      `,
    variables: {
      userId,
    },
  };
  return request({ url: '/graphql', method: 'post', data, headers });
};

// const login = ({ email, password }) => {
//   console.log(email, password);
//   const data = {
//     query: `
//         mutation Login($email: String!, $password: String!){
//           login(email: $email, password: $password){
//             userId
//             authToken
//             fName
//           }
//         }
//       `,
//     variables: {
//       email: `${email}`,
//       password: `${password}`,
//     },
//   };
//   return request({ url: 'http://192.168.1.113:8080/graphql', data });
// };

const updateUser = (userId, updateValue) => {
  const data = {
    query: `
      mutation UpdateUser($updateValue: UpdateUserInput!, $userId: ID!){
        updateUser(userId: $userId, updateValue: $updateValue){
          fName
          lName
          email
          position{
            address
            lat
            long
          }
          phone
          payment{
            paymentType
            detail
          }
          numNotification
          _id
        }
      }
    `,
    variables: {
      userId,
      updateValue,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

const clearDevice = uniqueId => {
  const data = {
    query: `
      mutation ClearDevice($uniqueId: String!){
        clearUserDeviceInfo(uniqueId: $uniqueId){
          _id
          fcmTokenUser
        }
      }
    `,
    variables: {
      uniqueId,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

const bookmark = (restId, userId) => {
  const data = {
    query: `
      mutation BookMark($restId: ID!, $userId: ID!){
        bookmark(restaurantId: $restId,userId: $userId){
          _id
          email
        }
      }
    `,
    variables: {
      restId,
      userId,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

export default {
  getUserInfo,
  updateUser,
  clearDevice,
  bookmark,
};
