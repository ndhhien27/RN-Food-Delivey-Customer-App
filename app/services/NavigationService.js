/* eslint-disable no-underscore-dangle */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationActions } from 'react-navigation';
import IconWithBadge from '../components/IconWithBadge';

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export function goBack(key) {
  _navigator.dispatch(
    NavigationActions.back({
      key,
    })
  );
}

export function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

// add other navigation functions that you need and export them

export function getActiveRoute(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRoute(route);
  }
  return route;
}

export const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
  let iconName;
  switch (routeName) {
    case 'Home':
      iconName = 'home-outline';
      break;
    case 'OrderTab':
      iconName = 'script-text-outline';
      break;
    case 'Account':
      iconName = 'account-outline';
      break;
    case 'Notification':
      iconName = 'bell-outline';
      IconComponent = IconWithBadge;
      break;
    default:
      break;
  }
  // if (routeName === 'Home') {
  //   iconName = 'home-outline';
  //   // We want to add badges to home tab icon
  //   IconComponent = IconWithBadge
  // }
  // if (routeName === 'Cart') {
  //   iconName = 'cart-outline';
  // }
  // else if (routeName === 'Settings') {
  //   iconName = `ios-options${focused ? '' : '-outline'}`;
  // }

  // You can return any component that you like here!
  return (
    <IconComponent
      name={iconName}
      size={30}
      color={tintColor}
      badgeCount={10}
    />
  );
};
