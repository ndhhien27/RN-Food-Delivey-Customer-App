import React, { useContext } from 'react';
import { View } from 'react-native';
import { CartContext } from '../context/CartContext';
import NormalCart from '../components/NormalCart';
import EmptyCart from '../components/EmptyCart';
import { theme } from '../constants/theme';

function CartScreen() {
  // useEffect(() => {
  //   const _navListener = navigation.addListener('didFocus', () => {
  //     StatusBar.setBarStyle("dark-content");
  //   });

  //   return () => { _navListener.remove() }
  // })

  const { cart } = useContext(CartContext);

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.lightestGray }}>
      {cart.cartItem.length <= 0 && <EmptyCart />}
      {cart.cartItem.length > 0 && <NormalCart cart={cart} />}
    </View>
  );
}

CartScreen.navigationOptions = () => ({ title: 'Cart' });

export default CartScreen;
