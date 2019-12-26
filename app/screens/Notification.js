/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/no-this-in-sfc */
import React, { useState } from 'react';
import {
  View,
  FlatList,
  Animated,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Icon } from 'react-native-elements';
import NotificationItem from '../components/NotificationItem';
import { markAsRead, deleteNoti } from '../actions/notificationActions';
import { getNotification } from '../actions';
import { theme } from '../constants/theme';

export default function Norification() {
  const notifications = useSelector(
    state => state.notificationReducer.notifications
  );
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  // const [listViewData, setListViewData] = useState([...notifications]);
  const dispatch = useDispatch();

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    console.log(rowMap, rowKey);
    closeRow(rowMap, rowKey);
    dispatch(deleteNoti(rowKey));
    // const newData = [...listViewData];
    // const prevIndex = listViewData.findIndex(item => item._id === rowKey);
    // console.log(prevIndex);
    // newData.splice(prevIndex, 1);
    // setListViewData(newData);
  };

  const rowSwipeAnimatedValues = {};
  notifications.forEach((el, i) => {
    rowSwipeAnimatedValues[`${el._id}`] = new Animated.Value(0);
  });

  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  return (
    <View style={{ flex: 1 }}>
      {notifications.length === 0 && (
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
      {notifications.length > 0 && (
        <SwipeListView
          data={notifications}
          keyExtractor={item => `${item._id}`}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => dispatch(getNotification())}
              colors={[theme.color.primary]}
              size={50}
            />
          }
          renderItem={({ item }) => (
            <NotificationItem
              item={item}
              onPress={() => dispatch(markAsRead(item._id))}
            />
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              {/* <Text>Left</Text> */}
              {/* <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={() => closeRow(rowMap, data.item._id)}
            >
              <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity> */}
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                activeOpacity={0.5}
                onPress={() => deleteRow(rowMap, data.item._id)}
                // onPress={() => console.log(data.item._id)}
              >
                <Animated.View
                  style={[
                    styles.trash,
                    {
                      transform: [
                        {
                          scale: rowSwipeAnimatedValues[
                            data.item._id
                          ].interpolate({
                            inputRange: [10, 50],
                            outputRange: [0, 1],
                            extrapolate: 'clamp',
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Icon
                    type="material-community"
                    name="trash-can-outline"
                    size={30}
                    iconStyle={{ color: '#fff' }}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
          )}
          rightOpenValue={-60}
          previewRowKey="0"
          previewOpenValue={-60}
          previewOpenDelay={1000}
          onRowDidOpen={onRowDidOpen}
          onSwipeValueChange={onSwipeValueChange}
          disableRightSwipe
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 60,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: Dimensions.get('window').width / 4,
  },
  trash: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 60,
  },
});
