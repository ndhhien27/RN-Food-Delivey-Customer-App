/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import StoreListByCategory from './StoreListByCategory';
import { theme } from '../constants/theme';
import FilterModal from './FilterModal';
import RestaurantService from '../services/RestaurantService';
import restaurantReducer from '../reducers/restaurantReducer';
import { search, clearSearch } from '../actions';

export default function StoreByCategory(props) {
  const { navigation } = props;
  const [storeList, setStoreList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const searchResult = useSelector(
    state => state.restaurantReducer.searchResult
  );
  const dispatch = useDispatch();
  const toggleModal = () => setModalVisible(!modalVisible);
  useEffect(() => {
    dispatch(search(navigation.state.params.query));
    navigation.setParams({ toggleModal });
    return () => {
      dispatch(clearSearch());
    };
  }, []);
  const devideHeight = Dimensions.get('window').height;

  return (
    <View style={{ flex: 1 }}>
      {/* <ImageBackground
        source={{ uri: 'http://via.placeholder.com/375x238' }}
        style={{
          width: '100%',
          height: 238,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Image</Text>
      </ImageBackground> */}
      <View style={{ flex: 1 }}>
        <StoreListByCategory data={searchResult} />
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
        activeOpacity={0.5}
        TouchableComponent={TouchableHighlight}
        underlayColor="#fff"
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
    title: navigation.state.params.query,
  };
};
