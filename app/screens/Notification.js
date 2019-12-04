/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/no-this-in-sfc */
import React, { Fragment, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';

export default function Notification() {
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
      console.log(fcmToken);
      showAlert('Your Firebase Token is:', fcmToken);
    } else {
      showAlert('Failed', 'No token received');
    }
  };

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };

  const messageListener = async () => {
    firebase.notifications().onNotification(notification => {
      const { title, body } = notification;
      showAlert(title, body);
    });

    firebase.notifications().onNotificationOpened(notificationOpen => {
      const { title, body } = notificationOpen.notification;
      showAlert(title, body);
    });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      showAlert(title, body);
    }

    firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  };

  const createNotificationListeners = async () => {
    firebase.notifications().onNotification(notification => {
      notification.android.setChannelId('test-channel').setSound('default');
      firebase.notifications().displayNotification(notification);
    });
  };

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false }
    );
  };

  return (
    <View>
      <Text>Notification</Text>
    </View>
  );
}
