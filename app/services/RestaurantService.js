import request from './request';

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
                img_url
              }
            }
          `,
    variables: {
      query: queryInput,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

const getRestaurantsWithSaga = userLocation => {
  console.log('calling');
  const data = {
    query: `
      query Restaurants($userLocation: LocationInput!){
        restaurants(userLocation: $userLocation){
          _id
          name
          position{
            address
            lat
            long
          }
          rating{
            avg
            total_review
          }
          distance
          createdAt
          img_url
        }
      }
    `,
    variables: {
      userLocation,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

const getRestaurantDetailWithSaga = restaurantId => {
  const data = {
    query: `
            query RestaurantInfo($restaurantId: ID!) {
              restaurantById(restaurantId: $restaurantId){
                _id
                position{
                  address
                  lat
                  long
                }
                bookmarks
                rating{
                  avg
                  total_review
                }      
                img_url
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
                orders{
                  user{
                    fName
                    lName
                  }
                  review{
                    star
                    description
                  }
                  updatedAt
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

const getReviews = restId => {
  const data = {
    query: `
      query GetReviews($restId: ID!){
        reviewsByRestaurant(restaurantId: $restId){
          user{
            fName
            lName
          }
          star
          description
        }
      }
    `,
    variables: {
      restId,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

export default {
  searchRestaurant,
  getRestaurantsWithSaga,
  getRestaurantDetailWithSaga,
  getReviews,
};

// AIzaSyDbGSMJEdxu7ajQyHA5F1b0mOalhnHxzTQ
