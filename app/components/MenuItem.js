import React, { useContext } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
// import { CartContext } from '../context/CartContext';

import { theme } from '../constants/theme';
import FoodItem from './FoodItem';

// function FoodItem(props) {

//   const renderItem = ({item})=>(
//     <ListItem
//       title={item.title}
//       subtitle={item.price}
//       bottomDivider
//     />
//   )
//   const { food, onPress } = props
//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: 'http://via.placeholder.com/160x160' }}
//         style={styles.image}
//       />
//       <View style={styles.info}>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{food.title}</Text>
//           <View>
//             <Text>{food.price}</Text>
//           </View>
//         </View>
//         <View style={styles.cartRow}>
//           <TouchableOpacity onPress={onPress}>
//             <Image source={image.addToCart} style={styles.addToCart} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   )
// }

function MenuItem(props) {
  // const { cart, addFoodToCart } = useContext(CartContext);
  const { menu, storeName } = props;

  return (
    <View style={{ paddingLeft: 16 }}>
      <FlatList
        data={menu.foods}
        renderItem={({ item }) => <FoodItem item={item} storeName={storeName} />}
        keyExtractor={(item) => `food-${item.id}`}
        ListHeaderComponent={<Text>{menu.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 160,
    width: 160,
    resizeMode: 'contain'
  },
  container: { flexDirection: 'row' },
  addToCart: {
    width: 25,
    height: 25,
  },
  title: { fontSize: theme.text.size.xl },
  info: {
    marginLeft: 16,
    flex: 1,
    flexDirection: 'column',
  },
  cartRow: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default MenuItem;
