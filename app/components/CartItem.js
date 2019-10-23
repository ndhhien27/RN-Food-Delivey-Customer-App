import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { image } from '../constants/images'
import { theme } from '../constants/theme'

import { Button } from './base_components/Button'

export default function CartItem(props) {
  const { item } = props
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'http://via.placeholder.com/640x360' }}
        style={styles.image}
      />
      <View style={styles.info}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.foodId}</Text>
          <View>
            <Text>Price</Text>
          </View>
        </View>
        <View style={styles.cartRow}>
          <Button type="decrease" />
          <Text>{item.qty}</Text>
          <Button type="increase" />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 130,
    width: 130
  },
  container: {
    flexDirection: 'row',
    marginBottom: 8
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
    flexDirection: 'row',
  }
})
