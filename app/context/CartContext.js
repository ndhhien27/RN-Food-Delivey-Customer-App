/* eslint-disable react/destructuring-assignment */
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const CartContext = createContext();

export default function CartProvider(props) {
  const [cart, setCart] = useState({
    storeName: '',
    cartItem: [],
  });

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

  useEffect(() => {
    removeCart();
    loadCart();
    console.log('load');
  }, []);

  useEffect(() => {
    storeCart(cart);
    console.log('store');
  }, [cart]);

  const addFoodToCart = (food, storeName) => {
    setCart(prevCart => {
      let afterCart = {};
      if (!prevCart.cartItem.find(item => item.foodId === food.id)) {
        afterCart = {
          ...prevCart,
          storeName,
          cartItem: [
            ...prevCart.cartItem,
            {
              foodId: food.id,
              foodName: food.title,
              foodPrice: food.price,
              foodQty: 1,
            },
          ],
        };
      } else {
        const newCartItem = prevCart.cartItem.map(item =>
          item.foodId !== food.id
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
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
