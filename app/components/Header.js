import React, { useEffect, useState } from 'react'
import { Text, View, Animated, StatusBar } from 'react-native'

import { withNavigation } from 'react-navigation'

import { Button, Icon } from 'react-native-elements'
import { theme } from '../constants/theme'
const AnimatedIcon = Animated.createAnimatedComponent(Icon)


function Header(props) {
  const { params } = props.state
  return (
    <Animated.View style={{
      backgroundColor: params.header,
      height: 88,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      borderBottomWidth: params.borderStyle,
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      borderColor: '#ccc'
    }}>
      <Button
        icon={
          <AnimatedIcon
            type='material-community'
            name='arrow-left'
            color={params.backBtn}
            size={28}
          />
        }
        onPress={() => props.goBack()}
        buttonStyle={{
          backgroundColor: null
        }}
      />
      <Button
        icon={
          <AnimatedIcon
            type='material-community'
            name='bookmark-outline'
            color={params.backBtn}
            size={28}
          />
        }
        onPress={() => props.goBack()}
        buttonStyle={{
          backgroundColor: null
        }}
      />
    </Animated.View>
  )
}

export default withNavigation(Header)