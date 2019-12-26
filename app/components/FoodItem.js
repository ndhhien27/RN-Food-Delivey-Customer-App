import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { theme } from '../constants/theme';
import { currencyFormat } from '../helpers/string';

export default function FoodItem(props) {
  const { item, childCart } = props;
  // const { addFoodToCart } = useContext(CartContext);
  return (
    <ListItem
      title={item.name}
      titleStyle={styles.title}
      subtitle={`${currencyFormat(item.price.value.toString())}đ`}
      subtitleStyle={styles.subtitleSty}
      bottomDivider
      Component={TouchableOpacity}
      activeOpacity={0.5}
      checkmark={{
        color: theme.color.primary,
        type: 'material-community',
        name: 'plus-circle',
        // opacity: item.isSelect ? 1 : 0,
        size: 26,
      }}
      containerStyle={{
        paddingHorizontal: 16,
        backgroundColor: theme.color.lightGray,
      }}
      onPress={() => {
        // addFoodToCart(item, props.storeName);
        props.handleItem(item);
      }}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
  },
  subtitleSty: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.sm,
    color: theme.color.darkGray,
  },
});
