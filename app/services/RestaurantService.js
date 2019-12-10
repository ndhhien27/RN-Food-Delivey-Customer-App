import axios from 'axios';
import request from './request';
import { API_URL } from './api_contants';

const getRestaurants = (resCallback, errCallBack) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
            query {
              restaurants{
                _id
                name
                position{
                  address
                  lat
                  long
                }
              }
            }
          `,
    },
  })
    .then(resCallback)
    .catch(errCallBack);
};

const getRestaurantDetail = (restaurantId, resCb, errCb) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
            query RestaurantInfo($restaurantId: ID!) {
              restaurantById(restaurantId: $restaurantId){
                position{
                  address
                  lat
                  long
                }
                name
                menu_info{
                  _id
                  name
                  foods{
                    _id
                    is_active
                    name
                    price{
                      value
                    }
                  }
                }
              }
            }
          `,
      variables: {
        restaurantId,
      },
    },
  })
    .then(resCb)
    .catch(errCb);
};

const searchRestaurant = queryInput => {
  const data = {
    query: `
            query Search($query: String!){
              searchRestaurant(query: $query){
                _id
                name
                position{
                  address
                  lat
                  long
                }
              }
            }
          `,
    variables: {
      query: queryInput,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

const getFoods = (queryInput, resCallback, errCallBack) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
            query Search($query: String!){
              searchRestaurant(query: $query){
                _id
                name
                position{
                  address
                  lat
                  long
                }
              }
            }
          `,
      variables: {
        query: queryInput,
      },
    },
  })
    .then(resCallback)
    .catch(errCallBack);
};

const getMenu = (restaurantId, resCallback, errCallback) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
        query Menu($restaurantId: ID!) {
          menuByRestaurant(restaurantId: $restaurantId){
            _id
            name
            foods{
              _id
              name
              price{
                value
              }
            }
          }
        }
      `,
      variables: {
        restaurantId,
      },
    },
  })
    .then(resCallback)
    .catch(errCallback);
};

const getRestaurantsWithSaga = () => {
  console.log('calling');
  const data = {
    query: `
      query {
        restaurants{
          _id
          name
          position{
            address
            lat
            long
          }
        }
      }
    `,
  };
  return request({ url: '/graphql', method: 'post', data });
};

const getRestaurantDetailWithSaga = restaurantId => {
  const data = {
    query: `
            query RestaurantInfo($restaurantId: ID!) {
              restaurantById(restaurantId: $restaurantId){
                position{
                  address
                  lat
                  long
                }
                name
                menu_info{
                  _id
                  name
                  foods{
                    _id
                    is_active
                    name
                    price{
                      value
                    }
                  }
                }
              }
            }
          `,
    variables: {
      restaurantId,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

export default {
  getRestaurants,
  getFoods,
  getMenu,
  getRestaurantDetail,
  searchRestaurant,
  getRestaurantsWithSaga,
  getRestaurantDetailWithSaga,
};

// AIzaSyDbGSMJEdxu7ajQyHA5F1b0mOalhnHxzTQ
