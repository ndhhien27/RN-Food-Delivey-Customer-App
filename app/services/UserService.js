import Axios from 'axios';
import { API_URL } from './api_contants';

const getUserInfo = (userId, resCallback, errCallback) => {
  console.log(userId);
  Axios({
    url: API_URL,
    method: 'POST',
    data: {
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
        }
      }
      `,
      variables: {
        userId,
      },
    },
  })
    .then(resCallback)
    .catch(errCallback);
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

export default {
  getUserInfo,
};
