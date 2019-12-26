/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../constants/theme';
import OrderTrackItem from '../../components/OrderTrackItem';
import { fetchingMyOrder } from '../../actions/orderActions';

const makeOrderListInProcess = () =>
  createSelector(
    state => state.orderReducer.myOrders,
    (_, status) => status,
    (myOrders, status) => myOrders.filter(el => status.includes(el.status))
  );

export default function OrderTrackContent({ status }) {
  const selectOrderListInProcess = useMemo(makeOrderListInProcess, []);
  const orderListInProcessValue = useSelector(state =>
    selectOrderListInProcess(state, status)
  );

  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      {orderListInProcessValue.length === 0 && (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Text
            style={{
              fontFamily: theme.text.fonts['sfpd-bold'],
              fontSize: theme.text.size['2xl'],
              color: theme.color.gray,
            }}
          >
            Empty
          </Text>
        </View>
      )}
      {orderListInProcessValue.length > 0 && (
        <FlatList
          data={orderListInProcessValue}
          keyExtractor={item => `order-${item._id}`}
          renderItem={({ item }) => <OrderTrackItem orderItem={item} />}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => dispatch(fetchingMyOrder(userId))}
              size={30}
              colors={[theme.color.primary]}
            />
          }
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
        />
      )}
    </View>
  );
}
