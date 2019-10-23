import React from 'react'
import { Text, FlatList, View } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'

import { theme } from '../constants/theme'
function Address(props) {

  const { listAddress, navigation } = props
  // const renderItem = ({ item }) => (
  //   <ListItem
  //     title={item.type}
  //     subtitle={item.info}
  //     bottomDivider={true}
  //   />
  // )
  return (
    <View>
      <Text style={{
        fontSize: 18,
        fontFamily: theme.text.fonts['sfpro-bold']
      }}>Address</Text>
      {
        listAddress.map((item, index) => (
          <ListItem
            key={index}
            title={item.type}
            subtitle={item.info}
            bottomDivider={true}
            contentContainerStyle={{
              marginLeft: -16
            }}
            titleStyle={{
              fontSize: 16,
              fontFamily: theme.text.fonts.sfpro,
              color: '#666'
            }}
            subtitleStyle={{
              fontSize: 18,
              fontFamily: theme.text.fonts.sfpro,
              marginTop: 6
            }}
            chevron
            subtitleProps={{ numberOfLines: 1 }}
          />
        ))
      }
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8
      }}>
        <Text style={{
          fontFamily: theme.text.fonts.sfpro,
          fontSize: 18,
          color: theme.color.pantone
        }}>Add new address</Text>
        <Button
          icon={
            <Icon
              type='material-community'
              name='plus-circle'
              color={theme.color.pantone}
              size={26}
            />
          }
          buttonStyle={{
            backgroundColor: null,
            padding: 0
          }}
          onPress={() => navigation.navigate('AddAddress')}
        />
      </View>
    </View>
  )
}

export default withNavigation(Address)