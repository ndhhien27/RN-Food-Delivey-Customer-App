/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  YellowBox,
  Alert,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from 'react-native-firebase';
import { getUniqueId } from 'react-native-device-info';
import AppSwitch from './AppNavigator';
import store, { persistor } from './app/store';
import {
  setTopLevelNavigator,
  navigate,
} from './app/services/NavigationService';
import { getDeviceInfo, updateWithFCM } from './app/actions';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

const AppContainer = createAppContainer(AppSwitch);

const prefix = 'customer://';

export default function App() {
  const uniqueId = getUniqueId();
  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  };
  const getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // Alert.alert(fcmToken);
      store.dispatch(getDeviceInfo(fcmToken, uniqueId));
      console.log(fcmToken);
      // const deviceUuid = DeviceInfo.getUniqueId();
      // await DeviceService.addOrUpdateDevice(fcmToken, Platform.OS, deviceUuid);
    } else {
      console.log('No token received');
    }
  };
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
    } catch (error) {
      console.log(error);
    }
  };

  const createNotificationListeners = async () => {
    firebase.notifications().onNotification(notification => {
      notification.android.setChannelId('test-channel').setSound('default');
      firebase.notifications().displayNotification(notification);
    });
  };

  const messageListener = async () => {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    const notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body, data } = notification;
        const newNoti = {
          title: data.title,
          order: {
            _id: data.orderId,
          },
          _id: data._id,
          createdAt: data.createdAt,
          hasRead: data.hasRead,
        };
        store.dispatch(updateWithFCM(newNoti));
        // Alert.alert(title);
      });
    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    const notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body, data } = notificationOpen.notification;
        const newNoti = {
          title: data.title,
          order: {
            _id: data.orderId,
          },
          _id: data._id,
          createdAt: data.createdAt,
          hasRead: data.hasRead,
        };
        store.dispatch(updateWithFCM(newNoti));
        navigate('OrderDetailScreen', { orderId: data.orderId });
      });
    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body, data } = notificationOpen.notification;
      // if(data.screen === 'order'){
      console.log(data);
      navigate('OrderDetailScreen', { orderId: data.orderId });
      // }
    }
    /*
     * Triggered for data only payload in foreground
     * */
    firebase.messaging().onMessage(message => {
      console.log('FCM Message Data: ', message.data);
    });
  };
  useEffect(() => {
    const channel = new firebase.notifications.Android.Channel(
      'test-channel',
      'test channel',
      firebase.notifications.Android.Importance.Max
    );
    firebase.notifications().android.createChannel(channel);
    checkPermission();
    messageListener();
    createNotificationListeners();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer
          ref={navigatorRef => {
            setTopLevelNavigator(navigatorRef);
          }}
          uriPrefix={prefix}
        />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
