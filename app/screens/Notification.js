import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'

export default function Notification(props) {
  return (
    <View>
      <Text>Notice</Text>
      <Button
        title='press'
        onPress={() => props.navigation.navigate('Store')}
      />
    </View>
  )
}