/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { theme } from '../constants/theme';

function OrderTrackItem(props) {
  const { orderItem, navigation } = props;
  return (
    <TouchableOpacity
      style={styles.shadow}
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate('OrderDetailScreen', {
          deliveryAddress: orderItem.delivery_address,
        })
      }
    >
      <View style={styles.contentContainer}>
        <View style={{ width: '90%' }}>
          <Text
            style={styles.orderId}
            numberOfLines={1}
          >{`Order - ${orderItem._id}`}</Text>
          <Text style={styles.restaurantName} numberOfLines={1}>
            {orderItem.restaurant.name}
          </Text>
          <Text style={styles.time}>{orderItem.createdAt}</Text>
          <Text style={styles.status}>{orderItem.status}</Text>
        </View>
        <View>
          <Icon
            type="material-community"
            name="chevron-right"
            color={theme.color.primary}
            size={28}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadow: {
    ...theme.shadow,
    marginBottom: 16,
  },
  contentContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderId: {
    fontFamily: theme.text.fonts['sfpd-medium'],
    fontSize: theme.text.size.lg,
  },
  restaurantName: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.lg,
    color: theme.color.darkGray,
    paddingTop: 8,
  },
  time: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
    color: theme.color.darkGray,
    paddingTop: 8,
  },
  status: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
    color: theme.color.primary,
    paddingTop: 8,
    textTransform: 'uppercase',
  },
});

export default withNavigation(OrderTrackItem);
