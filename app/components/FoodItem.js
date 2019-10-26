import React, { useContext } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { CartContext } from '../context/CartContext'

import { theme } from '../constants/theme';
import { image } from '../constants/images';
import { ListItem } from 'react-native-elements';

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

  const { cart, addFoodToCart } = useContext(CartContext)
  const { menu, onAddToCart, storeName } = props

  const renderItem = ({ item }) => (
    <ListItem
      title={item.title}
      subtitle={item.price}
      bottomDivider
    />
  )

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text>{menu.title}</Text>
      <FlatList
        data={menu.foods}
        keyExtractor={item => `food-${item.id}`}
        renderItem={({ item }) => <FoodItem food={item} onPress={() => addFoodToCart(item, storeName)} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 160,
    width: 160,
    resizeMode: 'contain'
  },
  container: {
    flexDirection: 'row',
  },
  addToCart: {
    width: 25,
    height: 25
  },
  title: {
    fontSize: theme.text.size.xl
  },
  info: {
    marginLeft: 16,
    flex: 1,
    flexDirection: 'column'
  },
  cartRow: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
})

export default MenuItem