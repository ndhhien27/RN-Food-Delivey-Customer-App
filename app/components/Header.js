import React, { useEffect, useState } from 'react'
import { Text, View, Animated, StatusBar } from 'react-native'

import { withNavigation } from 'react-navigation'

import { Button, Icon } from 'react-native-elements'
import { theme } from '../constants/theme'
const AnimatedIcon = Animated.createAnimatedComponent(Icon)


function Header(props) {
  const { style } = props
  return (
    <Animated.View style={{
      backgroundColor: style.headerStyle,
      // backgroundColor: 'red',
      height: 88,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      borderBottomWidth: style.borderStyle,
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
            color={style.backBtnStyle}
            size={28}
          />
        }
        onPress={() => props.navigation.navigate('Home')}
        buttonStyle={{
          backgroundColor: null
        }}
      />
      <Animated.Text style={{ color: theme.color.primary, opacity: style.borderStyle }}>abc</Animated.Text>
      <Button
        icon={
          <AnimatedIcon
            type='material-community'
            name='bookmark-outline'
            color={style.backBtnStyle}
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