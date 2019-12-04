import Axios from 'axios';
import request from './request';
import { API_URL } from './api_contants';

const login = ({ email, password }, resCallback, errCallback) => {
  Axios({
    url: API_URL,
    method: 'POST',
    data: {
      query: `
        mutation Login($email: String!, $password: String!){
          login(email: $email, password: $password){
            userId
            authToken
            fName
          }
        }
      `,
      variables: {
        email,
        password,
      },
    },
  })
    .then(resCallback)
    .catch(errCallback);
};

const signup = (userInput, resCallback, errCallback) => {
  Axios({
    url: API_URL,
    method: 'POST',
    data: {
      query: `
      mutation Signup($userInput: UserInput!){
        createUser(userInput: $userInput){
          _id
          fName
          email
          password
          createdRestaurants{
            name
          }
        }
      }
      `,
      variables: {
        userInput,
      },
    },
  })
    .then(resCallback)
    .catch(errCallback);
};

const login2 = (email, password) => {
  console.log(email, password);
  const data = {
    query: `
        mutation Login($email: String!, $password: String!){
          login(email: $email, password: $password){
            userId
            authToken
            fName
          }
        }
      `,
    variables: {
      email,
      password,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

export default {
  login,
  login2,
  signup,
};
