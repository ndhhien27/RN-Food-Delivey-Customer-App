/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import StoreListByCategory from '../components/StoreListByCategory';
import { theme } from '../constants/theme';
import FilterModal from './FilterModal';
import RestaurantService from '../services/RestaurantService';

export default function StoreByCategory(props) {
  const { navigation } = props;
  const [storeList, setStoreList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  useEffect(() => {
    RestaurantService.searchRestaurant(
      navigation.state.params.query,
      res => setStoreList(res.data.data.searchRestaurant),
      err => console.log(err)
    );
    navigation.setParams({ toggleModal });
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
