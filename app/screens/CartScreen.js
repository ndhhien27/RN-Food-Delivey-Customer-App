import React, { useContext, useEffect } from 'react'
import {
  TextInput,
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native'
import { Icon, Button, Divider } from 'react-native-elements'
import { CartContext } from '../context/CartContext'
import CartItem from '../components/CartItem'
import { theme } from '../constants/theme'

function TotalLine(props) {
  const { title, price, style } = props
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8
    }}>
      <Text style={{
        fontFamily: theme.text.fonts.sfui,
        fontSize: 16,
        ...style
      }}>{title}</Text>
      <Text style={{
        fontFamily: theme.text.fonts.sfui,
        fontSize: 16,
        ...style
      }}>{price}</Text>
    </View>
  )
}

function CartEmpty(props) {
  return (
    <SafeAreaView style={{
      backgroundColor: theme.color.lightestGray,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Button
        icon={
          <Icon
            type='material-community'
            name='cart-outline'
            color={theme.color.primary}
            size={100}
          />
        }
        disabled
        disabledStyle={{
          backgroundColor: '#fff',
          width: 200,
          height: 200,
          borderRadius: 100
        }}
      />
      <Text style={{
        color: theme.color.gray,
        fontFamily: theme.text.fonts['sfui-bold'],
        fontSize: 24,
        marginTop: 50
      }}>Cart Empty</Text>
    </SafeAreaView>
  )
}

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
    <View style={{ flex: 1, backgroundColor: theme.color.lightestGray }}>
      {cart.cartItem.length <= 0 && <CartEmpty />}
      {cart.cartItem.length > 0 &&
        <View>
          <View style={styles.shadow}>
            {/* <StatusBar barStyle='dark-content' /> */}
            <View style={styles.contentContainer}>
              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{cart.storeName}</Text>
                <View style={styles.addressRow}>
                  <Icon
                    type='material-community'
                    name='map-marker'
                    color={theme.color.gray}
                    size={18}
                  />
                  <Text
                    style={styles.addressInfo}
                    numberOfLines={1}
                  >382 Ton Duc Thang, Lien Chieu, Da Nang, Viet Nam</Text>
                </View>
                <View style={{
                  backgroundColor: theme.color.primary,
                  alignSelf: 'flex-start',
                  paddingHorizontal: 12,
                  paddingVertical: 2,
                  borderRadius: 12,
                }}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>Promotion</Text>
                </View>
              </View>
              <FlatList
                data={cart.cartItem}
                renderItem={({ item }) =>
                  <CartItem item={item} />
                }
                keyExtractor={item => `item${item.foodId}`}
                contentContainerStyle={styles.list}
              />
            </View>
          </View >
          <SafeAreaView style={styles.total}>
            <TotalLine title='SubTotal' price={15000} />
            <TotalLine title='Delivery' price={10000} />
            <Divider style={{ backgroundColor: theme.color.gray }} />
            <TotalLine
              title='Total'
              price={25000}
              style={{ fontFamily: theme.text.fonts["sfui-bold"], fontSize: 20 }}
            />
            <Button
              title='Continue'
              titleStyle={{ fontFamily: theme.text.fonts.sfui, fontSize: 22 }}
              buttonStyle={{
                backgroundColor: theme.color.primary,
                borderRadius: 8,
                marginTop: 16
              }}
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Checkout')}
            />
          </SafeAreaView>
        </View>
      }
    </View>
  )
}

CartScreen.navigationOptions = ({ navigation }) => ({
  title: 'Cart'
})

const styles = StyleSheet.create({
  storeName: {
    fontFamily: theme.text.fonts["sfui-bold"],
    fontSize: 24,
  },
  storeInfo: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: theme.color.lightestGray,
    paddingHorizontal: 16,
    backgroundColor: '#f3f3f3'
  },
  shadow: {
    shadowOffset: { height: 5, width: 0 },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  contentContainer: {
    backgroundColor: '#fff',
    height: 400,
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 16
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8
  },
  addressInfo: {
    fontFamily: theme.text.fonts['sfui-medium'],
    fontSize: 18,
    color: theme.color.gray
  },
  list: {
    paddingHorizontal: 16
  },
  total: {
    marginTop: 100,
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderColor: theme.color.lightestGray,
    backgroundColor: '#fff',
    height: '100%'
  }
})

export default CartScreen