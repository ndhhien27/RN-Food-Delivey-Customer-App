/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import formatDate from '../helpers/date';
import { theme } from '../constants/theme';

function NotificationItem(props) {
  const { item, onPress } = props;
  return (
    <TouchableHighlight
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.5}
      underlayColor="#fff"
    >
      <View
        style={
          item.hasRead ? styles.contentContainer : styles.contentContainerNew
        }
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.orderId}>{`Order - ${item.order._id}`}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            type="material-community"
            name="clock-outline"
            size={17}
            iconStyle={{ color: theme.color.darkGray }}
            containerStyle={{ paddingRight: 4 }}
          />
          <Text style={styles.time}>{formatDate(item.createdAt)}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: theme.color.gray,
  },
  contentContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  contentContainerNew: {
    backgroundColor: theme.color.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontFamily: theme.text.fonts['sfpd-medium'],
    fontSize: theme.text.size.lg,
  },
  orderId: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
    color: theme.color.darkGray,
    paddingVertical: 4,
  },
  time: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
    color: theme.color.darkGray,
  },
});

export default withNavigation(NotificationItem);
