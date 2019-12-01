/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { CartContext } from '../context/CartContext';
import NormalCart from '../components/NormalCart';
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
  const { storeName, increase, storeId } = navigation.state.params;
  const [state, setstate] = useState(0);
  const { cart } = useContext(CartContext);
  useEffect(() => {
    const index = cart.findIndex(el => el.storeId === storeId);
    setstate(index);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.lightGray }}>
      {cart[state].items.length === 0 && <EmptyCart />}
      {cart[state].items.length > 0 && (
        <NormalCart
          // cart={cart}
          storeName={storeName}
          increase={() => increase()}
        />
      )}
    </View>
  );
}

CartScreen.navigationOptions = () => ({ title: 'Cart' });

export default CartScreen;
