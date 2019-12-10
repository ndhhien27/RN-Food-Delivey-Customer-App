/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NotificationItem from '../components/NotificationItem';
import { markAsRead } from '../actions/notificationActions';

export default function Norification() {
  const notifications = useSelector(
    state => state.notificationReducer.notifications
  );
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const channel = new firebase.notifications.Android.Channel(
  //     'test-channel',
  //     'test channel',
  //     firebase.notifications.Android.Importance.Max
  //   );
  //   firebase.notifications().android.createChannel(channel);
  //   checkPermission();
  //   messageListener();
  //   // createNotificationListeners();
  // }, []);

  // const checkPermission = async () => {
  //   const enabled = await firebase.messaging().hasPermission();
  //   if (enabled) {
  //     getFcmToken();
  //   } else {
  //     requestPermission();
  //   }
  // };

  // const getFcmToken = async () => {
  //   const fcmToken = await firebase.messaging().getToken();
  //   if (fcmToken) {
  //     console.log(fcmToken);
  //     // showAlert('Your Firebase Token is:', fcmToken);
  //   } else {
  //     showAlert('Failed', 'No token received');
  //   }
  // };

  // const requestPermission = async () => {
  //   try {
  //     await firebase.messaging().requestPermission();
  //     // User has authorised
  //   } catch (error) {
  //     // User has rejected permissions
  //   }
  // };

  // const messageListener = async () => {
  //   firebase.notifications().onNotification(notification => {
  //     console.log(notification.data);
  //     const { title, body } = notification;
  //     // console.log(data);
  //     // showAlert(title, body);
  //   });

  //   firebase.notifications().onNotificationOpened(notificationOpen => {
  //     const { data } = notificationOpen.notification;
  //     navigation.navigate('Home');
  //     console.log(data);
  //   });

  //   const notificationOpen = await firebase
  //     .notifications()
  //     .getInitialNotification();
  //   if (notificationOpen) {
  //     console.log(notificationOpen);
  //     const { title, body } = notificationOpen.notification;
  //     // showAlert(title, body);
  //   }

  //   firebase.messaging().onMessage(message => {
  //     console.log(JSON.stringify(message));
  //   });
  // };

  // const createNotificationListeners = async () => {
  //   firebase.notifications().onNotification(notification => {
  //     notification.android.setChannelId('test-channel').setSound('default');
  //     firebase.notifications().displayNotification(notification);
  //   });
  // };

  // const showAlert = (title, message) => {
  //   Alert.alert(
  //     title,
  //     message,
  //     [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
  //     { cancelable: false }
  //   );
  // };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={notifications}
        keyExtractor={item => `noti-${item._id}`}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={() => dispatch(markAsRead(item._id))}
          />
        )}
      />
    </View>
  );
}
// ////////////////////////////

// import React, { useEffect, useContext } from ‘react’;
// import Navigator from ‘./Navigator’;
// import AppProvider, { AppContext } from ‘./AppProvider’;
// import { Platform, Alert } from ‘react-native’;
// import firebase from ‘react-native-firebase’;
// import NotificationProvider, { NotificationContext } from ‘./components/core/NotificationsContext’;
// import { NavigationService } from ‘./services/NavigationService’;
// const App = () => {
//   const notificationContext = useContext(NotificationContext)
//   console.log(notificationContext)
//   const checkPermission = async () => {
//     const enabled = await firebase.messaging().hasPermission();
//     if (enabled) {
//       getFcmToken();
//     } else {
//       requestPermission();
//     }
//   };
//   const getFcmToken = async () => {
//     const fcmToken = await firebase.messaging().getToken();
//     if (fcmToken) {
//       Alert.alert(fcmToken);
//       console.log(fcmToken);
//       // const deviceUuid = DeviceInfo.getUniqueId();
//       // await DeviceService.addOrUpdateDevice(fcmToken, Platform.OS, deviceUuid);
//     } else {
//       console.log(‘No token received’);
//     }
//   };
//   const requestPermission = async () => {
//     try {
//       await firebase.messaging().requestPermission();
//     } catch (error) { }
//   };
//   const messageListener = async () => {
//     /*
//      * Triggered when a particular notification has been received in foreground
//      * */
//     const notificationListener = firebase
//       .notifications()
//       .onNotification(notification => {
//         const { title, body, data } = notification;
//         Alert.alert(title);
//       });
//     /*
//      * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
//      * */
//     const notificationOpenedListener = firebase
//       .notifications()
//       .onNotificationOpened(notificationOpen => {
//         const { title, body } = notificationOpen.notification;
//       });
//     /*
//      * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
//      * */
//     const notificationOpen = await firebase
//       .notifications()
//       .getInitialNotification();
//     if (notificationOpen) {
//       const { title, body } = notificationOpen.notification;
//     }
//     /*
//      * Triggered for data only payload in foreground
//      * */
//     firebase.messaging().onMessage(message => {
//       console.log(‘FCM Message Data:’, message.data);
//     });
//   };
//   useEffect(() => {
//     checkPermission();
//     messageListener();
//   }, []);
//   return (
//     <AppProvider>
//         <Navigator
//           screenProps={
//             {
//               notificationCount: notificationContext.notificationCount.get,
//               setNotificationCount: notificationContext.notificationCount.set
//             }}
//           ref={navigationRef =>
//             NavigationService.setTopLevelNavigator(navigationRef)
//           }
//         />
//     </AppProvider>
//   );
// };
// export default App
