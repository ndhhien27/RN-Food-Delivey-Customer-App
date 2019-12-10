/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { withNavigationFocus } from 'react-navigation';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/OrderService';
import OrderTrackItem from '../../components/OrderTrackItem';
import { theme } from '../../constants/theme';
import { fetchingMyOrder } from '../../actions/orderActions';

function OrderTrack({ navigation, isFocused }) {
  const myOrders = useSelector(state => state.orderReducer.myOrders);
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const userId = useSelector(state => state.authReducer.userId);
  const dispatch = useDispatch();
  const fetchOrder = () => dispatch(fetchingMyOrder(userId));
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: 'first', title: 'In Process' },
      { key: 'second', title: 'Completed' },
    ],
  });

  // const navigationDidFocusListener = navigation.addListener('didFocus', () => {
  //   console.log('did focus');
  //   fetchOrder();
  // });

  // const navigationDidBlurListener = navigation.addListener('didBlur', () => {
  //   console.log('did blur');
  //   navigationDidFocusListener.remove();
  // });

  const handleRefresh = () => {
    fetchOrder();
  };

  useEffect(() => {
    fetchOrder();
    // console.log(isFocused);
    // return () => {
    //   navigationDidFocusListener.remove();
    // };
  }, []);
  return (
    <TabView
      swipeEnabled
      renderTabBar={props => (
        <TabBar
          {...props}
          labelStyle={{
            textTransform: 'uppercase',
            fontFamily: theme.text.fonts['sfpt-medium'],
            fontSize: 17,
          }}
          indicatorStyle={{ backgroundColor: theme.color.primary }}
          indicatorContainerStyle={{ backgroundColor: '#fff' }}
          inactiveColor={theme.color.darkGray}
          activeColor={theme.color.primary}
          pressOpacity={0.5}
        />
      )}
      navigationState={state}
      renderScene={SceneMap({
        first: () => (
          <View style={{ flex: 1, backgroundColor: theme.color.lightGray }}>
            <Text>My Order</Text>
            <FlatList
              data={myOrders}
              keyExtractor={item => `order-${item._id}`}
              renderItem={({ item }) => <OrderTrackItem orderItem={item} />}
              refreshing={isLoading}
              onRefresh={handleRefresh}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          </View>
        ),
        second: () => (
          <View style={{ flex: 1, backgroundColor: theme.color.lightGray }}>
            <Text>My Order</Text>
            <FlatList
              data={myOrders}
              keyExtractor={item => `order-${item._id}`}
              renderItem={({ item }) => <OrderTrackItem orderItem={item} />}
              refreshing={isLoading}
              onRefresh={handleRefresh}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          </View>
        ),
      })}
      onIndexChange={index => setState({ ...state, index })}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  );
}
export default withNavigationFocus(OrderTrack);
