import React, { useContext, useEffect } from 'react'
import {
  TextInput,
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar
} from 'react-native'

import { CartContext } from '../context/CartContext'
import CartItem from '../components/CartItem'

function CartScreen(props) {

  const { navigation } = props

  // useEffect(() => {
  //   const _navListener = navigation.addListener('didFocus', () => {
  //     StatusBar.setBarStyle("dark-content");
  //   });

  //   return () => { _navListener.remove() }
  // })

  const { cart } = useContext(CartContext)


  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar barStyle='dark-content' /> */}
      <FlatList
        data={cart}
        renderItem={({ item }) =>
          <CartItem item={item} />
        }
        keyExtractor={item => `item${item.foodId}`}
        contentContainerStyle={styles.list}
      />
      <SafeAreaView>
        <View style={{ borderTopWidth: 1, borderColor: "#000", marginBottom: 8 }}>
          <Text>Total</Text>
        </View>
      </SafeAreaView>
    </View >
  )
}

CartScreen.navigationOptions = ({ navigation }) => ({
  title: 'Cart'
})

const styles = StyleSheet.create({
  list: {
  }
})

export default CartScreen