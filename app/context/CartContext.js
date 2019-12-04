/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { createContext, useState, useEffect } from 'react';
import produce from 'immer';
import AsyncStorage from '@react-native-community/async-storage';

export const CartContext = createContext();

export default function CartProvider(props) {
  const [cart, setCart] = useState([]);

  const storeCart = async newCart => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    } catch (error) {
      console.log(error);
    }
  };

  const loadCart = async () => {
    try {
      const value = await AsyncStorage.getItem('cart');
      const parsedValue = JSON.parse(value);
      // eslint-disable-next-line no-unused-vars
      setCart(prevCart => {
        return parsedValue || { storeName: '', cartItem: [] };
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   removeCart();
  //   loadCart();
  //   console.log('load');
  // }, []);

  // useEffect(() => {
  //   storeCart(cart);
  //   console.log('store');
  // }, [cart]);

  const addFoodToCart = (food, restaurantId) => {
    setCart(prevCart => {
      let afterCart = {};
      if (!prevCart.cartItem.find(item => item.foodId === food._id)) {
        afterCart = {
          ...prevCart,
          restaurantId,
          cartItem: [
            ...prevCart.cartItem,
            {
              foodId: food._id,
              foodName: food.name,
              foodPrice: food.price.value,
              foodQty: 1,
            },
          ],
        };
      } else {
        const newCartItem = prevCart.cartItem.map(item =>
          item.foodId !== food._id
            ? { ...item }
            : { ...item, foodQty: item.foodQty + 1 }
        );
        afterCart = {
          ...prevCart,
          cartItem: [...newCartItem],
        };
      }
      // storeCart(afterCart);
      return afterCart;
    });
  };

  const deleteChildCart = newCart => {
    const index = cart.findIndex(el => el.restaurantId === newCart.restaurantId);
    const newCartContext = [...cart];
    newCartContext.splice(index, 1);
    setCart(newCartContext);
  };

  const updateCartContext = newCart => {
    // const index = cart.find(el => el.restaurantId === newCart.restaurantId);
    const newCartContext = produce(cart, draft => {
      const index = cart.findIndex(el => el.restaurantId === newCart.restaurantId);
      if (index !== -1) draft[index] = newCart;
      else draft.push({ ...newCart });
    });
    setCart(newCartContext);
  };

  // eslint-disable-next-line no-unused-vars
  const increaseQty = food => {
    setCart(prevCart => {
      return prevCart.map(item => item.foodId);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addFoodToCart,
        updateCartContext,
        deleteChildCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
