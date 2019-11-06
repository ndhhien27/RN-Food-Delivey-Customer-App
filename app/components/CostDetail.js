import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export default function CostDetail(props) {
  const { title, style, price } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
      }}
    >
      <Text style={[styles.text, { ...style }]}>{title}</Text>
      <Text style={[styles.text, { ...style }]}>{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: 16,
  },
});
