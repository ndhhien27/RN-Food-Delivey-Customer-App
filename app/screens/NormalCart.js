/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { useSelector } from 'react-redux';
import { theme } from '../constants/theme';
import CostDetail from '../components/CostDetail';
import CartItem from '../components/CartItem';

function NormalCart(props) {
  const { storeName, navigation, localCartIndex } = props;
  const { address } = navigation.state.params;
  // const [cartIndex, setCartIndex] = useState(0);
  const globalCart = useSelector(state => state.cartReducer.cart);
  return (
    <View>
      <View style={styles.shadow}>
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
              <Text style={{ color: '#fff', fontSize: 16 }}>
                {localCartIndex}
              </Text>
            </View>
          </View>
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
      </View>
      <SafeAreaView style={styles.total}>
        <CostDetail
          title="SubTotal"
          price={globalCart[localCartIndex].subtotal}
        />
        <CostDetail title="Delivery" price={globalCart[localCartIndex].total} />
        <Divider style={{ backgroundColor: theme.color.darkGray }} />
        <CostDetail
          title="Total"
          price={25000}
          style={{
            fontFamily: theme.text.fonts['sfpt-bold'],
            fontSize: 20,
          }}
        />
        <Button
          title="Continue"
          titleStyle={{ fontFamily: theme.text.fonts.sfpt, fontSize: 22 }}
          buttonStyle={{
            backgroundColor: theme.color.primary,
            borderRadius: 8,
            marginTop: 16,
          }}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Checkout', { localCartIndex })}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  storeName: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: 24,
  },
  storeInfo: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: theme.color.lightGray,
    paddingHorizontal: 16,
    backgroundColor: '#f3f3f3',
  },
  shadow: theme.shadow,
  contentContainer: {
    backgroundColor: '#fff',
    height: 400,
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
    borderTopWidth: 0.5,
    borderColor: theme.color.lightGray,
    backgroundColor: '#fff',
    height: '100%',
  },
});

export default withNavigation(NormalCart);
