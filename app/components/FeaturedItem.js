import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { image } from '../constants/images';

export default function FeaturedItem(props) {
  const { item } = props;
  return (
    <View style={styles.container}>
      <Image source={image.ft} style={styles.img} />
      <View style={styles.detail}>
        <Text>{item.title}</Text>
        <Text>{item.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
  },
  img: {
    width: 200,
    height: 120,
    borderRadius: 6,
  },
  detail: {
    paddingTop: 8,
  },
});
