import React, { useState, useContext } from 'react';
import { ListItem } from 'react-native-elements';
import { theme } from '../constants/theme';
import { CartContext } from '../context/CartContext';

export default function FoodItem(props) {
  const { item } = props;
  const [isSelect, setisSelect] = useState(false);
  const { addFoodToCart } = useContext(CartContext);
  return (
    <ListItem
      title={item.title}
      subtitle={item.price}
      bottomDivider
      checkmark={{
        color: theme.color.primary,
        type: 'material-community',
        name: isSelect ? 'check-circle' : 'plus-circle-outline',
        // opacity: item.isSelect ? 1 : 0,
        size: 26,
      }}
      containerStyle={{
        paddingHorizontal: 16,
        backgroundColor: theme.color.lightestGray,
      }}
      onPress={() => {
        addFoodToCart(item, props.storeName);
        setisSelect(true);
      }}
    />
  );
}
