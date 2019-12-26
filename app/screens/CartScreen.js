/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { CartContext } from '../context/CartContext';
import NormalCart from './NormalCart';
import EmptyCart from '../components/EmptyCart';
import { theme } from '../constants/theme';

function CartScreen({ navigation }) {
  // useEffect(() => {
  //   const _navListener = navigation.addListener('didFocus', () => {
  //     StatusBar.setBarStyle("dark-content");
  //   });

  //   return () => { _navListener.remove() }
  // })

  // const { cart } = useContext(CartContext);
  const { storeName, increase, localCartIndex } = navigation.state.params;
  // const [state, setstate] = useState(0);
  // const { cart } = useContext(CartContext);
  const cart = useSelector(state => state.cart.cart);
  // useEffect(() => {
  //   const index = cart.findIndex(el => el.restaurantId === restaurantId);
  //   setstate(index);
  // }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.lightGray }}>
      {!cart[localCartIndex] && <EmptyCart />}
      {cart[localCartIndex] && (
        <NormalCart
          // cart={cart}
          localCartIndex={localCartIndex}
          storeName={storeName}
          increase={() => increase()}
        />
      )}
    </View>
  );
}

CartScreen.navigationOptions = () => ({ title: 'Cart' });

export default CartScreen;
