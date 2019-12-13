import Axios from 'axios';
import request from './request';
import { API_URL } from './api_contants';

const createOrder = orderDetail => {
  const data = {
    query: `
      mutation Order($orderInput: OrderInput!){
        createOrder(orderInput: $orderInput){
          _id
          delivery_address
          user{
            _id
            fName
          }
          subtotal
          total
        }
      }
      `,
    variables: {
      orderInput: {
        restaurant: orderDetail.restaurantId,
        delivery_address: orderDetail.deliveryAddress,
        user: orderDetail.userId,
        subtotal: orderDetail.subtotal,
        total: orderDetail.total,
        items: orderDetail.items.map(el => {
          return {
            food: el.foodId,
            qty: el.foodQty,
          };
        }),
        payment: {
          paymentType: orderDetail.paymentType,
          detail: orderDetail.paymentInfo,
        },
      },
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

const getOrderByUser = userId => {
  const data = {
    query: `
        query GetOrder($userId: ID!){
          orderByUser(userId: $userId){
            _id
            createdAt
            restaurant{
              name
            }
            status
          }
        }
      `,
    variables: {
      userId,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

const updateOrder = (orderId, status) => {
  const data = {
    query: `
      mutation UpdateOrder($orderId: ID!, $status: String!){
        updateOrder(orderId:$orderId status:$status){
          _id
          delivery_address
          status
        }
      }
      `,
    variables: {
      orderId,
      status,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

const reviewOrder = (orderId, { star, desc }) => {
  const data = {
    query: `
      mutation ReviewOrder($orderId: ID!, $star: Int!, $desc: String!){
        reviewOrder(orderId:$orderId star:$star description: $desc){
          _id
          review{
            star
            description
          }
        }
      }
      `,
    variables: {
      orderId,
      star,
      desc,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

const fetchOrderById = orderId => {
  const data = {
    query: `
        query GetOrderById($orderId: ID!){
          orderById(orderId: $orderId){
            _id
            createdAt
            restaurant{
              name
            }
            delivery_address
            total
            status
            subtotal
            payment{
              paymentType
              detail
            }
            review{
              star
              description
            }
            items{
              _id
              qty
              food{
                _id
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
      orderId,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};

export default {
  createOrder,
  getOrderByUser,
  updateOrder,
  fetchOrderById,
  reviewOrder,
};
