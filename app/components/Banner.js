import React from 'react'
import { Image, View, ImageBackground, Text, StatusBar } from 'react-native'

import { Icon } from 'react-native-elements'

import StarInfo from '../commons/store/StarInfo'
import { theme } from '../constants/theme'
function Banner() {
  return (
    <View>
      <ImageBackground
        source={{ uri: 'http://via.placeholder.com/350x350' }}
        style={{ width: '100%', height: 350, resizeMode: 'cover' }}
      >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.17)', flex: 1 }}>
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: 18,
            paddingHorizontal: 16,
            alignItems: 'flex-start'
          }}>
            <View style={{
              backgroundColor: theme.color.pantone,
              alignSelf: 'flex-start',
              paddingHorizontal: 12,
              paddingVertical: 2,
              borderRadius: 9,
            }}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Promotion</Text>
            </View>
            <Text style={{
              color: '#fff',
              fontSize: 30,
              paddingVertical: 4
            }}>djaklsdjlasd</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                type='material-community'
                name='map-marker'
                color='#fff'
              />
              <Text style={{
                color: '#fff',
                fontSize: 16
              }}>382 Ton Duc Thang, Lien Chieu, Da Nang</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: '#fff' }}>
            <StarInfo />
            <StarInfo />
            <StarInfo style={{ borderRightWidth: 0 }} />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Banner