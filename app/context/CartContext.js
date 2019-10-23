import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const CartContext = createContext();

export default function CartProvider(props) {

  const [cart, setCart] = useState([])

  const storeCart = async (newCart) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify([...newCart]))
    } catch (error) {
      console.log(error)
    }
  }

  const loadCart = async () => {
    try {
      const value = await AsyncStorage.getItem('cart')
      const parsedValue = JSON.parse(value)
      setCart(prevCart => {
        return parsedValue || [];
      })
    } catch (err) {
      console.log(err)
    }
  }

  const removeCart = async () => {
    try {
      await AsyncStorage.removeItem('cart')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // removeCart()
    loadCart()
    console.log('load')
  }, [])

  useEffect(() => {
    storeCart(cart)
    console.log('store')
  }, [cart])


  const addFoodToCart = (food) => {
    setCart(prevCart => {
      let afterCart = [];
      if (!prevCart.find(item => item.foodId === food.id)) {
        afterCart = [
          ...prevCart,
          {
            foodId: food.id,
            qty: 1
          }
        ]
      }
      else {
        afterCart = prevCart.map(item =>
          item.foodId !== food.id ? { ...item } : { ...item, qty: item.qty + 1 })
      }
      // storeCart(afterCart);
      return afterCart
    })
  }

  const increaseQty = (food) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.foodId
      )
    })
  }

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        addFoodToCart: addFoodToCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}
