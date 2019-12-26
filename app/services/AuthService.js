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

const signup = userInput => {
  const data = {
    query: `
      mutation SignUp($userInput: UserInput!){
        createUser(userInput: $userInput){
          _id
          fName
          lName
          email
        }
      }
    `,
    variables: {
      userInput,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

const login2 = loginInput => {
  console.log(loginInput);
  const data = {
    query: `
        mutation Login($loginInput: LoginInput!){
          login(loginInput: $loginInput){
            userId
            authToken
            fName
          }
        }
      `,
    variables: {
      loginInput,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

export default {
  login,
  login2,
  signup,
};
