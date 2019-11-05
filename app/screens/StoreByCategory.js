/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import StoreListByCategory from '../components/StoreListByCategory';
import { theme } from '../constants/theme';
import FilterModal from './FilterModal';

export default function StoreByCategory(props) {
  const [storeList, setStoreList] = useState([
    { id: 1, name: 'Random', address: '54 Nguyen Luong Bang' },
    { id: 2, name: 'Random', address: '54 Nguyen Luong Bang' },
    { id: 3, name: 'Random', address: '54 Nguyen Luong Bang' },
    { id: 4, name: 'Random', address: '54 Nguyen Luong Bang' },
    { id: 5, name: 'Random', address: '54 Nguyen Luong Bang' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  useEffect(() => {
    props.navigation.setParams({ toggleModal });
  }, []);
  const devideHeight = Dimensions.get('window').height;

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: 'http://via.placeholder.com/375x238' }}
        style={{
          width: '100%',
          height: 238,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Image</Text>
      </ImageBackground>
      <View style={{ flex: 1, marginTop: 16 }}>
        <StoreListByCategory data={storeList} />
      </View>
      <Modal
        isVisible={modalVisible}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        backdropTransitionOutTiming={0}
      >
        <View
          style={{
            height: (devideHeight * 2) / 3,
            backgroundColor: 'white',
            borderRadius: 16,
          }}
        >
          <FilterModal onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

StoreByCategory.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <Button
        icon={
          <Icon
            type="material-community"
            name="filter-outline"
            color={theme.color.primary}
            size={28}
          />
        }
        onPress={() => navigation.state.params.toggleModal()}
        buttonStyle={{
          backgroundColor: null,
        }}
      />
    ),
  };
};
