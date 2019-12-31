import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { theme } from '../constants/theme';
import { currencyFormat } from '../helpers/string';

export default function CartItem(props) {
  const { item, increase, qty, decrease } = props;
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.foodName}</Text>
          <View>
            <Text style={styles.price}>{`${currencyFormat(
              item.foodPrice.toString()
            )}đ`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.changeQtyStyle}>
        <Button
          icon={
            <Icon
              type="material-community"
              name="minus-circle-outline"
              color={theme.color.primary}
            />
          }
          onPress={decrease}
          buttonStyle={{ padding: 0, backgroundColor: null }}
          activeOpacity={0.5}
          TouchableComponent={TouchableHighlight}
          underlayColor="#fff"
        />
        <Text
          style={{
            paddingHorizontal: 8,
          }}
        >
          {qty}
        </Text>
        <Button
          icon={
            <Icon
              type="material-community"
              name="plus-circle-outline"
              color={theme.color.primary}
            />
          }
          onPress={increase}
          buttonStyle={{ padding: 0, backgroundColor: null }}
          activeOpacity={0.5}
          TouchableComponent={TouchableHighlight}
          underlayColor="#fff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 130,
    width: 130,
  },
  container: {
    flexDirection: 'row',
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderColor: theme.color.gray,
    paddingVertical: 8,
  },
  addToCart: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: theme.text.size.md,
    fontFamily: theme.text.fonts.sfpt,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
  },
  changeQtyStyle: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  price: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    color: theme.color.darkGray,
  },
});
