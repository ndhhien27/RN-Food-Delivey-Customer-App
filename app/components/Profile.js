import React from 'react'
import { Text, View } from 'react-native'
import { Avatar, Button, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import { theme } from '../constants/theme'

function Profile(props) {

  const { navigation } = props
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          rounded
          source={{ uri: 'http://via.placeholder.com/86x86' }}
          size={86}
        />
        <View style={{
          paddingLeft: 16
        }}>
          <Text style={{
            fontSize: 24,
            fontFamily: theme.text.fonts['sfpro-bold']
          }}>Nguyen Duc Hien</Text>
          <Text style={{
            fontSize: 18,
            fontFamily: theme.text.fonts.sfpro
          }}>ndhien@gmail.com</Text>
        </View>
      </View>
      <Button
        icon={
          <Icon
            type='material-community'
            name='account-edit'
            color={theme.color.pantone}
            size={30}
          />
        }
        buttonStyle={{
          backgroundColor: null,
          padding: 0
        }}
        onPress={() => navigation.navigate('EditProfile')}
      />
    </View>
  )
}

export default withNavigation(Profile)