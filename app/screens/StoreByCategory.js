import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { Button, Icon, Overlay } from 'react-native-elements'

import StoreListByCategory from '../components/StoreListByCategory'

import { theme } from '../constants/theme'

export default function StoreByCategory(props) {

  const [storeList, setStoreList] = useState([
    { id: 1, name: 'Random', address: '54 Nguyen Luong Bang' },
    { id: 2, name: 'Random', address: '54 Nguyen Luong Bang' },
    { id: 3, name: 'Random', address: '54 Nguyen Luong Bang' },
    { id: 4, name: 'Random', address: '54 Nguyen Luong Bang' },
    { id: 5, name: 'Random', address: '54 Nguyen Luong Bang' }
  ])
  const [modalVisible, setModalVisible] = useState(false)
  const toggleModal = () => setModalVisible(!modalVisible)
  useEffect(() => {
    props.navigation.setParams({ toggleModal })
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'http://via.placeholder.com/375x238' }}
        style={{ width: '100%', height: 238, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text>Image</Text>
      </ImageBackground>
      <View style={{ flex: 1, marginTop: 16 }}>
        <StoreListByCategory data={storeList} />
      </View>
      <Overlay
        animationType='slide'
        isVisible={modalVisible}
        width='100%'
      >
        <View>
          <Text>Modal</Text>
          <Button
            title='Hide Modal'
            onPress={toggleModal}
          />
        </View>
      </Overlay>
    </View>
  )
}

StoreByCategory.navigationOptions = ({ navigation }) => {
  return {
    headerRight: <Button
      icon={
        <Icon
          type='material-community'
          name='filter-outline'
          color={theme.color.pantone}
          size={28}
        />
      }
      onPress={() => navigation.state.params.toggleModal()}
      buttonStyle={{
        backgroundColor: null
      }}
    />
  }
}