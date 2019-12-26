/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { AirbnbRating } from 'react-native-elements';
import { theme } from '../constants/theme';
import formatDate from '../helpers/date';

const getReviewsByRestaurant = createSelector(
  state => state.restaurantReducer.restaurantInfo.orders,
  orders => orders.filter(order => order.review.star !== null)
);

export default function ReviewScreen({ navigation }) {
  const reviews = useSelector(state => getReviewsByRestaurant(state));

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Text
          style={styles.name}
        >{`${item.user.lName} ${item.user.fName}`}</Text>
        <Text style={styles.date}>{formatDate(item.updatedAt)}</Text>
        <View style={{ alignItems: 'flex-start' }}>
          <AirbnbRating
            defaultRating={item.review.star}
            showRating={false}
            isDisabled
            size={20}
            starContainerStyle={{
              paddingLeft: 0,
            }}
          />
        </View>
        <Text style={styles.desc}>{item.review.description}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {reviews.length === 0 && (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Text
            style={{
              fontFamily: theme.text.fonts['sfpd-bold'],
              fontSize: theme.text.size['2xl'],
              color: theme.color.gray,
            }}
          >
            Empty
          </Text>
        </View>
      )}
      {reviews.length !== 0 && (
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => `${index}`}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
  },
  desc: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
  },
  date: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.sm,
    color: theme.color.darkGray,
  },
  container: {
    borderBottomWidth: 1,
    borderColor: theme.color.gray,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
