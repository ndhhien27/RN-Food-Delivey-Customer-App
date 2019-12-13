/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../constants/theme';
import OrderTrackItem from '../../components/OrderTrackItem';
import { fetchingMyOrder } from '../../actions/orderActions';

const makeOrderListInProcess = () =>
  createSelector(
    state => state.orderReducer.myOrders,
    (_, status) => status,
    (myOrders, status) =>
      myOrders.filter(el => el.status === status[0] || el.status === status[1])
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
    <View
      style={{
        flex: 1,
        backgroundColor: theme.color.lightGray,
        paddingTop: 16,
      }}
    >
      <FlatList
        data={orderListInProcessValue}
        keyExtractor={item => `order-${item._id}`}
        renderItem={({ item }) => <OrderTrackItem orderItem={item} />}
        refreshing={isLoading}
        onRefresh={() => dispatch(fetchingMyOrder(userId))}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
}
