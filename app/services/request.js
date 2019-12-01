import axios from 'axios';

const API_URL = 'http://192.168.1.2:8080';
const client = axios.create({
  baseURL: API_URL,
});

/**
 * Request Wrapper with default success/error actions
 */
const request = async options => {
  const onSuccess = response => {
    console.debug('Request Successful!', response.data.data);
    return response.data.data;
  };

  const onError = error => {
    console.log(error);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export default request;
