import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { theme } from '../constants/theme';
import CostDetail from './CostDetail';
import CartItem from './CartItem';

function NormalCart(props) {
  const { navigation, cart } = props;
  return (
    <View>
      <View style={styles.shadow}>
        <View style={styles.contentContainer}>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{cart.storeName}</Text>
            <View style={styles.addressRow}>
              <Icon
                type="material-community"
                name="map-marker"
                color={theme.color.gray}
                size={18}
              />
              <Text style={styles.addressInfo} numberOfLines={1}>
                382 Ton Duc Thang, Lien Chieu, Da Nang, Viet Nam
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
              <Text style={{ color: '#fff', fontSize: 16 }}>Promotion</Text>
            </View>
          </View>
          <FlatList
            data={cart.cartItem}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={item => `item${item.foodId}`}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
      <SafeAreaView style={styles.total}>
        <CostDetail title="SubTotal" price={15000} />
        <CostDetail title="Delivery" price={10000} />
        <Divider style={{ backgroundColor: theme.color.gray }} />
        <CostDetail
          title="Total"
          price={25000}
          style={{
            fontFamily: theme.text.fonts['sfui-bold'],
            fontSize: 20,
          }}
        />
        <Button
          title="Continue"
          titleStyle={{ fontFamily: theme.text.fonts.sfui, fontSize: 22 }}
          buttonStyle={{
            backgroundColor: theme.color.primary,
            borderRadius: 8,
            marginTop: 16,
          }}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Checkout')}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  storeName: {
    fontFamily: theme.text.fonts['sfui-bold'],
    fontSize: 24,
  },
  storeInfo: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: theme.color.lightestGray,
    paddingHorizontal: 16,
    backgroundColor: '#f3f3f3',
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
    marginHorizontal: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  addressInfo: {
    fontFamily: theme.text.fonts['sfui-medium'],
    fontSize: 18,
    color: theme.color.gray,
  },
  list: { paddingHorizontal: 16 },
  total: {
    marginTop: 100,
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderColor: theme.color.lightestGray,
    backgroundColor: '#fff',
    height: '100%',
  },
});

export default withNavigation(NormalCart);
