import Axios from 'axios';
import request from './request';
import { API_URL } from './api_contants';

const createOrder = (orderDetail, resCallback, errCallback) => {
  Axios({
    url: API_URL,
    method: 'POST',
    data: {
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
          restaurant: orderDetail.storeId,
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
    },
  })
    .then(resCallback)
    .catch(errCallback);
};

const getOrderByUser = (userId, resCb, errCb) => {
  Axios({
    url: API_URL,
    method: 'post',
    data: {
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
    },
  })
    .then(resCb)
    .catch(errCb);
};
export default {
  createOrder,
  getOrderByUser,
};
