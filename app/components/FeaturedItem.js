import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { image } from '../constants/images';
import { theme } from '../constants/theme';

export default function FeaturedItem(props) {
  const { item } = props;
  return (
    <View style={styles.container}>
      <Image source={image.ft} style={styles.img} />
      <View style={styles.detail}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.price}</Text>
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
