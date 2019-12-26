/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { theme } from '../constants/theme';
import dateFormat from '../helpers/date';

function OrderTrackItem(props) {
  const { orderItem, navigation } = props;
  return (
    <TouchableOpacity
      style={styles.shadow}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('OrderDetailScreen', {
          orderDetail: orderItem,
          orderId: orderItem._id,
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: 8,
            }}
          >
            <Icon
              type="material-community"
              name="clock-outline"
              size={17}
              iconStyle={{ color: theme.color.darkGray }}
            />
            <Text style={styles.time}>{dateFormat(+orderItem.createdAt)}</Text>
          </View>
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
    elevation: 10,
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
    paddingLeft: 4,
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
