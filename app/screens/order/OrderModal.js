import React from 'react'
import { Text, SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { theme } from '../../constants/theme'
import { withNavigation } from 'react-navigation'

function OrderModal(props) {

  const { navigation, hideModal } = props
  return (
    <View style={{ alignItems: 'center', justifyContent: 'space-evenly', flex: 1 }}>
      <Icon
        type='material-community'
        name='check'
        color={theme.color.primary}
        size={80}
        containerStyle={{
          borderColor: 'rgba(255,140,0,0.3)',
          borderWidth: 6,
          width: 120,
          height: 120,
          borderRadius: 60,
          alignSelf: 'center',
          justifyContent: 'center'
        }}
      />
      <Text style={styles.title}>Success</Text>
      <Button
        title='Continue Shopping'
        onPress={() => { navigation.navigate('Home'); hideModal() }}
        buttonStyle={{
          backgroundColor: theme.color.primary,
          width: 235,
          height: 44,
          borderRadius: 22
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.text.fonts["sfui-bold"],
    fontSize: 28
  }
})

export default withNavigation(OrderModal)