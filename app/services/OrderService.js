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
            delivery_address
            total
            status
            subtotal
            payment{
              paymentType
              detail
            }
            items{
              qty
              food{
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
      userId,
    },
  };
  return request({ url: '/graphql', method: 'post', data });
};
export default {
  createOrder,
  getOrderByUser,
};
