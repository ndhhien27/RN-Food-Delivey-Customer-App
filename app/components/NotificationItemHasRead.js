/* eslint-disable no-underscore-dangle */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import formatDate from '../helpers/date';
import { theme } from '../constants/theme';

function NotificationItemHasRead(props) {
  const { item, onPress } = props;
  console.log(item.hasRead);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.5}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.orderId}>{`Order - ${item.order._id}`}</Text>
        <Text style={styles.time}>{formatDate(item.createdAt)}</Text>
      </View>
    </TouchableOpacity>
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
    borderRadius: 8,
  },
  contentContainerNew: {
    backgroundColor: theme.color.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
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

export default withNavigation(NotificationItemHasRead);
