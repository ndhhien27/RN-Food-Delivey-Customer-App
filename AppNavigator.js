/* eslint-disable no-unused-vars */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import {
  getActiveRoute,
  getTabBarIcon,
} from './app/services/NavigationService';
import Home from './app/screens/Home';
import StoreScreen from './app/screens/StoreScreen';
import CartScreen from './app/screens/CartScreen';
import StoreByCategory from './app/screens/StoreByCategory';
import MainScreen from './app/screens/account/MainScreen';
import EditProfile from './app/screens/account/EditProfile';
import AddAddressScreen from './app/screens/account/AddAddressScreen';
import LoginScreen from './app/screens/auth/LoginScreen';
import { theme } from './app/constants/theme';
import Notification from './app/screens/Notification';
import CheckoutScreen from './app/screens/order/CheckoutScreen';
import SearchScreen from './app/screens/SearchScreen';
import SignupScreen from './app/screens/auth/SignupScreen';
import WelCome from './app/screens/auth/WelCome';
import LocationPickerScreen from './app/screens/MapScreen';
import OrderTrack from './app/screens/my_order/OrderTrack';
import OrderDetail from './app/screens/my_order/OrderDetail';

const MapStack = createStackNavigator(
  {
    MapScreen: LocationPickerScreen,
  },
  {
    headerMode: 'none',
  }
);
const AccountStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
      // params: { statusbar: 'dark-content' }
    },
    EditProfile: {
      screen: EditProfile,
      // params: { statusbar: 'dark-content' },
    },
    AddAddress: {
      screen: AddAddressScreen,
      // params: { statusbar: 'dark-content' },
    },
  },
  {
    // navigationOptions: ({ navigation }) => {
    //   let tabBarVisible = false;
    //   if (getActiveRoute(navigation.state).routeName === 'Main')
    //     tabBarVisible = true;
    //   return {
    //     tabBarVisible,
    //   };
    // },
    defaultNavigationOptions: ({ navigation }) => ({
      headerBackImage: (
        <Button
          icon={
            <Icon
              type="material-community"
              name="arrow-left"
              color={theme.color.primary}
              size={28}
            />
          }
          onPress={() => navigation.goBack()}
          buttonStyle={{
            backgroundColor: null,
          }}
        />
      ),
    }),
    headerBackTitleVisible: false,
  }
);

const OrderStack = createStackNavigator(
  {
    MyOrderScreen: {
      screen: OrderTrack,
    },
    OrderDetailScreen: {
      screen: OrderDetail,
    },
  },
  {
    navigationOptions: () => {
      return {
        tabBarLabel: 'Order',
      };
    },
  }
);

const CartStack = createStackNavigator(
  {
    CartScreen: {
      screen: CartScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Button title="back" onPress={() => navigation.navigate('Tab')} />
          ),
        };
      },
      // params: { statusbar: 'dark-content' },
    },
    Checkout: {
      screen: CheckoutScreen,
    },
  },
  {
    initialRouteName: 'CartScreen',
  }
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      // params: { statusbar: 'dark-content' },
      navigationOptions: {
        headerBackTitle: null,
      },
    },
    StoreByCategory: {
      screen: StoreByCategory,
      params: { statusbar: 'dark-content' },
      navigationOptions: ({ navigation }) => {
        return {
          headerTintColor: theme.color.primary,
        };
      },
    },
    Store: {
      screen: StoreScreen,
      params: { statusbar: 'light-content' },
      navigationOptions: ({ navigation }) => {
        return {
          header: null,
        };
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = false;
      if (getActiveRoute(navigation.state).routeName === 'Home')
        tabBarVisible = true;
      return {
        tabBarVisible,
      };
    },
    initialRouteName: 'Home',
  }
);

const NotificationStack = createStackNavigator({
  Notification: {
    screen: Notification,
  },
});

const AuthStack = createStackNavigator(
  {
    WelCome,
    Login: {
      screen: LoginScreen,
      // params: { statusbar: 'dark-content' },
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Button
              title="Back"
              type="clear"
              onPress={() => navigation.goBack()}
            />
          ),
        };
      },
    },
    MapScreen: {
      screen: MapStack,
    },
  },
  {
    initialRouteName: 'WelCome',
    defaultNavigationOptions: () => ({
      headerTransparent: true,
    }),
  }
);

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
  },
  {
    headerMode: 'none',
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    OrderTab: OrderStack,
    Notification: NotificationStack,
    Account: AccountStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: theme.color.primary,
      inactiveTintColor: theme.color.darkGray,
      labelStyle: {
        fontFamily: theme.text.fonts.sfpt,
        // fontSize: 15,
      },
    },
  }
);

const AppNavigator = createStackNavigator(
  {
    Tab: TabNavigator,
    Cart: CartStack,
    Search: SearchStack,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppSwitch = createSwitchNavigator(
  {
    Auth: AuthStack,
    Main: AppNavigator,
  },
  {
    initialRouteName: 'Auth',
  }
);

// const AppNavigator = createStackNavigator({
//   Main: TabNavigator
// })

export default AppSwitch;
