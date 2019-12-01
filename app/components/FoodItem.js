import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { theme } from '../constants/theme';
import { CartContext } from '../context/CartContext';

export default function FoodItem(props) {
  const { item, childCart } = props;
  const [isSelect, setisSelect] = useState(false);
  const { addFoodToCart } = useContext(CartContext);
  return (
    <ListItem
      title={item.name}
      titleStyle={styles.title}
      subtitle={item.price.value}
      subtitleStyle={styles.subtitle}
      bottomDivider
      checkmark={{
        color: theme.color.primary,
        type: 'material-community',
        name: 'cart',
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
  subtitle: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.sm,
    color: theme.color.darkGray,
  },
});
