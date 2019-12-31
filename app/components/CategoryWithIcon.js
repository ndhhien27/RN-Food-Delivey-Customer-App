import React, { useState } from 'react';
import {
  View,
  Image,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import { image } from '../constants/images';
import { theme } from '../constants/theme';

function CategoryWithIcon(props) {
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState([
    { id: 1, name: 'Cơm', uri: image.categoryImg.riceW },
    { id: 2, name: 'Trà sữa', uri: image.categoryImg.milk_tea },
    { id: 3, name: 'Gà', uri: image.categoryImg.chicken },
    { id: 4, name: 'Pizza', uri: image.categoryImg.pizza },
    { id: 5, name: 'Bún', uri: image.categoryImg.noodle },
    { id: 6, name: 'Bánh ngọt', uri: image.categoryImg.cake },
  ]);
  return (
    <View>
      <Text style={{ paddingLeft: 16, fontSize: 20, paddingVertical: 16 }}>
        Categories
      </Text>
      <FlatList
        data={category}
        // contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ marginRight: 16 }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                props.navigation.navigate('StoreByCategory', {
                  query: item.name,
                })
              }
            >
              <View style={styles.imgContainer}>
                <Image source={item.uri} style={styles.img} />
              </View>
              <Text style={styles.text}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{ paddingLeft: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  imgContainer: {
    backgroundColor: theme.color.primary,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.xs,
  },
  img: {
    height: 45,
    width: 45,
  },
  text: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
  },
});

export default withNavigation(CategoryWithIcon);
