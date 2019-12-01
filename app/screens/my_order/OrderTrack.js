/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/OrderService';
import OrderTrackItem from '../../components/OrderTrackItem';
import { theme } from '../../constants/theme';

export default function OrderTrack({ navigation }) {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { authInfo } = useContext(AuthContext);
  const fectOrder = () => {
    API.getOrderByUser(
      authInfo.userId,
      res => {
        if (res.data.errors) alert(res.data.errors.message);
        else {
          setOrderList(res.data.data.orderByUser);
          setIsLoading(false);
        }
      },
      err => console.log(err)
    );
  };

  const navigationWillFocusListener = navigation.addListener(
    'willFocus',
    () => {
      fectOrder();
    }
  );

  const handleRefresh = () => {
    setIsLoading(true);
    fectOrder();
  };

  useEffect(() => {
    fectOrder();
    return function cleanup() {
      navigationWillFocusListener.remove();
    };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: theme.color.lightGray }}>
      <Text>My Order</Text>
      <FlatList
        data={orderList}
        keyExtractor={item => `order-${item._id}`}
        renderItem={({ item }) => <OrderTrackItem orderItem={item} />}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}
