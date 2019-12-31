/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableHighlight,
} from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../constants/theme';
import CostDetail from '../components/CostDetail';
import { modifyCart, clearCart } from '../actions/cartActions';
import CartItem from '../components/CartItem';

function NormalCart(props) {
  const { storeName, navigation, localCartIndex } = props;
  const { address, resetChildCart } = navigation.state.params;
  const dispatch = useDispatch();
  // const [cartIndex, setCartIndex] = useState(0);
  const globalCart = useSelector(state => state.cart.cart);
  const deleteCart = () => {
    Alert.alert('Detele cart', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => resetChildCart() },
    ]);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.contentContainer}>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{storeName}</Text>
          <View style={styles.addressRow}>
            <Icon
              type="material-community"
              name="map-marker"
              color={theme.color.darkGray}
              size={18}
            />
            <Text style={styles.addressInfo} numberOfLines={1}>
              {address}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.color.primary,
              alignSelf: 'flex-start',
              paddingHorizontal: 12,
              paddingVertical: 2,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Free ship</Text>
          </View>
        </View>
        <Button
          activeOpacity={0.5}
          TouchableComponent={TouchableHighlight}
          underlayColor="transparent"
          icon={
            <Icon
              type="material-community"
              name="trash-can-outline"
              iconStyle={{ color: theme.color.primary }}
            />
          }
          onPress={deleteCart}
          containerStyle={{ position: 'absolute', right: 0 }}
          type="clear"
        />
        <FlatList
          data={globalCart[localCartIndex].items}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              increase={() => navigation.state.params.increase(item)}
              decrease={() => navigation.state.params.decrease(item)}
              qty={item.foodQty}
            />
          )}
          keyExtractor={item => `item${item.foodId}`}
          contentContainerStyle={styles.list}
        />
      </View>
      <View style={styles.total}>
        <CostDetail
          title="SubTotal"
          price={globalCart[localCartIndex].subtotal}
        />
        <CostDetail title="Delivery" price={0} />
        <Divider style={{ backgroundColor: theme.color.darkGray }} />
        <CostDetail
          title="Total"
          price={globalCart[localCartIndex].total}
          style={{
            fontFamily: theme.text.fonts['sfpt-bold'],
            fontSize: 20,
          }}
        />
        <Button
          activeOpacity={0.5}
          TouchableComponent={TouchableHighlight}
          underlayColor="#fff"
          title="Continue"
          titleStyle={{ fontFamily: theme.text.fonts.sfpt, fontSize: 22 }}
          buttonStyle={{
            backgroundColor: theme.color.primary,
            borderRadius: 8,
            // marginTop: 16,
          }}
          onPress={() => navigation.navigate('Checkout', { localCartIndex })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  storeName: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: 24,
  },
  storeInfo: {
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: theme.color.lightGray,
    paddingHorizontal: 16,
    backgroundColor: '#f3f3f3',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  contentContainer: {
    elevation: 5,
    backgroundColor: '#fff',
    flex: 2,
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  addressInfo: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: 18,
    color: theme.color.darkGray,
  },
  list: { paddingHorizontal: 16 },
  total: {
    paddingHorizontal: 16,
    marginTop: 16,
    borderTopWidth: 0.5,
    borderColor: theme.color.gray,
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default withNavigation(NormalCart);
