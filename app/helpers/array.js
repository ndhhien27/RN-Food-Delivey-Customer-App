/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import produce from 'immer';

export const modifyArr = (cart, newCart) => {
  return produce(cart, draft => {
    const index = cart.findIndex(
      el => el.restaurantId === newCart.restaurantId
    );
    if (index !== -1) draft[index] = newCart;
    else draft.push({ ...newCart });
  });
};
