/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { withNavigationFocus } from 'react-navigation';
import { AuthContext } from '../../context/AuthContext';
import API from '../../services/OrderService';
import OrderTrackItem from '../../components/OrderTrackItem';
import { theme } from '../../constants/theme';
import { fetchingMyOrder } from '../../actions/orderActions';
import OrderTrackContent from './OrderTrackContent';

function OrderTrack({ navigation, isFocused }) {
  const myOrders = useSelector(state => state.orderReducer.myOrders);
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();
  const fetchOrder = () => dispatch(fetchingMyOrder(userId));
  const [tabState, setTabState] = useState({
    index: 0,
    routes: [
      { key: 'first', title: 'In Process' },
      { key: 'second', title: 'Completed' },
      { key: 'third', title: 'Cancelled' },
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
      navigationState={tabState}
      renderScene={SceneMap({
        first: () => (
          <OrderTrackContent status={['pending', 'accepted', 'delivering']} />
        ),
        second: () => <OrderTrackContent status={['completed']} />,
        third: () => <OrderTrackContent status={['cancelled']} />,
      })}
      onIndexChange={index => setTabState({ ...tabState, index })}
      initialLayout={{ width: Dimensions.get('window').width }}
    />
  );
}
export default withNavigationFocus(OrderTrack);
