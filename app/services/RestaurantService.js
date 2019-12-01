import axios from 'axios';
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
                address
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
                address
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

const searchRestaurant = (queryInput, resCallback, errCallBack) => {
  axios({
    url: API_URL,
    method: 'post',
    data: {
      query: `
            query Search($query: String!){
              searchRestaurant(query: $query){
                _id
                name
                address
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
                address
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

export default {
  getRestaurants,
  getFoods,
  getMenu,
  getRestaurantDetail,
  searchRestaurant,
};

// AIzaSyDbGSMJEdxu7ajQyHA5F1b0mOalhnHxzTQ
