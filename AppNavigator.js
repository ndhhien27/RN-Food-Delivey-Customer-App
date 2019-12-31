/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Button, Icon } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableHighlight } from 'react-native';
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
import store from './app/store';
import { fetchingMyOrder } from './app/actions/orderActions';
import { updateUser, getNotification } from './app/actions';
import RestaurantListByDistance from './app/screens/RestaurantListByDistance';
import MapNearest from './app/screens/MapNearest';
import ReviewScreen from './app/screens/ReviewScreen';

const MapStack = createStackNavigator(
  {
    MapScreen: LocationPickerScreen,
  },
  {
    headerMode: 'none',
  }
);

const RestaurantStack = createStackNavigator(
  {
    Store: {
      screen: StoreScreen,
      params: { statusbar: 'light-content' },
      navigationOptions: ({ navigation }) => {
        return {
          header: null,
        };
      },
      path: 'store/:restId',
    },
    Review: {
      screen: ReviewScreen,
      navigationOptions: () => {
        return {
          title: 'Reviews',
          headerTintColor: theme.color.primary,
        };
      },
    },
    StoreMap: {
      screen: LocationPickerScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerBackImage: (
            <Button
              activeOpacity={0.5}
              TouchableComponent={TouchableHighlight}
              underlayColor="#fff"
              icon={<Icon type="material-community" name="arrow-left" />}
              type="clear"
              // onPress={() => navigation.goBack(null)}
              size={28}
            />
          ),
          header: null,
        };
      },
    },
  },
  {
    initialRouteName: 'Store',
    headerBackTitleVisible: false,
    navigationOptions: () => {
      return {
        header: null,
      };
    },
    headerLayoutPreset: 'center',
  }
);

const AccountStack = createStackNavigator(
  {
    Info: {
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
    defaultNavigationOptions: ({ navigation }) => ({
      headerBackImage: (
        <Button
          activeOpacity={0.5}
          TouchableComponent={TouchableHighlight}
          underlayColor="#fff"
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
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = false;
      if (getActiveRoute(navigation.state).routeName === 'Info')
        tabBarVisible = true;
      return {
        tabBarVisible,
      };
    },
  }
);

const OrderStack = createStackNavigator(
  {
    MyOrderScreen: {
      screen: OrderTrack,
      path: 'myorder',
      navigationOptions: () => {
        return {
          title: 'My Orders',
        };
      },
    },
    OrderDetailScreen: {
      screen: OrderDetail,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerBackImage: (
          <Button
            activeOpacity={0.5}
            TouchableComponent={TouchableHighlight}
            underlayColor="#fff"
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
        headerTintColor: theme.color.primary,
      };
    },
    headerBackTitleVisible: false,
    navigationOptions: ({ navigation }) => {
      let tabBarVisible = false;
      if (getActiveRoute(navigation.state).routeName === 'MyOrderScreen')
        tabBarVisible = true;
      return {
        tabBarVisible,
        tabBarLabel: 'Order',
      };
    },
    initialRouteName: 'MyOrderScreen',
    headerLayoutPreset: 'center',
  }
);

const CartStack = createStackNavigator(
  {
    CartScreen: {
      screen: CartScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Button
              activeOpacity={0.5}
              TouchableComponent={TouchableHighlight}
              underlayColor="#fff"
              onPress={() => navigation.goBack(null)}
              icon={
                <Icon
                  type="material-community"
                  name="arrow-left"
                  color={theme.color.primary}
                />
              }
              type="clear"
              size={28}
            />
          ),
        };
      },
      // params: { statusbar: 'dark-content' },
    },
    Checkout: {
      screen: CheckoutScreen,
      navigationOptions: () => {
        return {
          title: 'Checkout',
        };
      },
    },
  },
  {
    initialRouteName: 'CartScreen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => {
      return {
        headerTintColor: theme.color.primary,
      };
    },
  }
);

const RestaurantNearestStack = createStackNavigator(
  {
    StoreByDistacne: {
      screen: RestaurantListByDistance,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'Near me',
          headerLeft: (
            <Button
              activeOpacity={0.5}
              TouchableComponent={TouchableHighlight}
              underlayColor="#fff"
              icon={
                <Icon
                  type="material-community"
                  name="arrow-left"
                  color={theme.color.primary}
                />
              }
              type="clear"
              onPress={() => navigation.goBack(null)}
              size={28}
            />
          ),
          headerRight: (
            <Button
              activeOpacity={0.5}
              TouchableComponent={TouchableHighlight}
              underlayColor="#fff"
              icon={
                <Icon
                  type="material-community"
                  name="map-search-outline"
                  color={theme.color.primary}
                />
              }
              type="clear"
              onPress={() => navigation.navigate('MapNearest')}
              size={28}
            />
          ),
        };
      },
    },
    MapNearest: {
      screen: MapNearest,
      navigationOptions: ({ navigation }) => {
        return {
          title: 'Map',
          headerBackImage: (
            <Button
              activeOpacity={0.5}
              TouchableComponent={TouchableHighlight}
              underlayColor="#fff"
              buttonStyle={{ padding: 0 }}
              icon={
                <Icon
                  type="material-community"
                  name="arrow-left"
                  color={theme.color.primary}
                />
              }
              onPress={() => navigation.goBack()}
              type="clear"
              size={28}
            />
          ),
        };
      },
    },
  },
  {
    initialRouteName: 'StoreByDistacne',
    headerBackTitleVisible: false,
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => {
      return {
        headerTintColor: theme.color.primary,
      };
    },
  }
);

const ListStoreByRatingStack = createStackNavigator({
  ListStoreByRating: {
    screen: RestaurantListByDistance,
    navigationOptions: () => {
      return {
        header: null,
      };
    },
  },
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      // params: { statusbar: 'dark-content' },
      navigationOptions: {
        headerBackTitle: null,
        headerTintColor: theme.color.primary,
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
    Restaurant: {
      screen: RestaurantStack,
    },
    ListStoreByRatingStack: {
      screen: ListStoreByRatingStack,
      navigationOptions: () => {
        return {
          title: 'Rating',
        };
      },
    },
    RestaurantByDistance: {
      screen: RestaurantNearestStack,
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
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => {
      return {
        headerTintColor: theme.color.primary,
      };
    },
  }
);

const NotificationStack = createStackNavigator(
  {
    Notification: {
      screen: Notification,
      navigationOptions: () => {
        return {
          title: 'Notification',
          headerTintColor: theme.color.primary,
        };
      },
    },
  },
  {
    headerLayoutPreset: 'center',
  }
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      // params: { statusbar: 'dark-content' },
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: ({ navigation }) => {
        return {
          header: null,
        };
      },
    },
  },
  {
    initialRouteName: 'Login',
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
    Home: {
      screen: HomeStack,
    },
    OrderTab: {
      screen: OrderStack,
      path: '',
    },
    Notification: NotificationStack,
    Account: AccountStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
      tabBarOnPress: ({ defaultHandler }) => {
        const { state } = navigation;
        defaultHandler();
        if (state.routeName === 'OrderTab') {
          const { auth } = store.getState();
          store.dispatch(fetchingMyOrder(auth.userId));
        }
        if (state.routeName === 'Notification') {
          const { auth } = store.getState();
          store.dispatch(getNotification());
          store.dispatch(updateUser(auth.userId, { numNotification: 0 }));
        }
      },
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
    Tab: {
      screen: TabNavigator,
      path: '',
    },
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
    AuthLoading: WelCome,
    Auth: AuthStack,
    Main: {
      screen: AppNavigator,
      path: '',
    },
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

// const AppNavigator = createStackNavigator({
//   Main: TabNavigator
// })

export default AppSwitch;
