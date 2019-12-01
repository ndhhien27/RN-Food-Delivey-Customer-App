/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
// import { CartContext } from '../context/CartContext';
import { theme } from '../constants/theme';
import FoodItem from './FoodItem';

function MenuItem(props) {
  // const { cart, addFoodToCart } = useContext(CartContext);
  const { menu, storeId } = props;

  return (
    <View style={{ paddingLeft: 16 }}>
      <FlatList
        data={menu.foods}
        renderItem={({ item }) => (
          <FoodItem
            item={item}
            storeId={storeId}
            handleItem={props.handleItem}
          />
        )}
        keyExtractor={item => `food-${item._id}`}
        ListHeaderComponent={<Text style={styles.title}>{menu.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
    paddingVertical: theme.space.xs,
  },
});

export default MenuItem;
