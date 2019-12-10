import request from './request';

const getUserInfo = userId => {
  const data = {
    query: `
       query GetUserInfo($userId: ID!){
        userById(userId: $userId){
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
        }
      }
      `,
    variables: {
      userId,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
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

export default {
  getUserInfo,
  updateUser,
};
