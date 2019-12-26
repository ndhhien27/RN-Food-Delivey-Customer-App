import axios from 'axios';
import { MAP_KEY, DIRECTION_URL, GEOCODE_URL } from './api_contants';

const directions = (origin, destination, resCb, errCb) => {
  const params = {
    origin,
    destination,
    key: MAP_KEY,
  };
  return axios({
    method: 'get',
    url: DIRECTION_URL,
    params,
  })
    .then(resCb)
    .catch(errCb);
};

const geocodeReverse = (lat, long, resCb, errCb) => {
  const params = {
    latlng: `${lat},${long}`,
    key: MAP_KEY,
  };
  return axios({
    method: 'get',
    url: GEOCODE_URL,
    params,
  })
    .then(resCb)
    .catch(errCb);
};

export default {
  directions,
  geocodeReverse,
};
