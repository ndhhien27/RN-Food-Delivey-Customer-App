import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconWithBadge from '../components/IconWithBadge';

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
    case 'Cart':
      iconName = 'cart-outline';
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
