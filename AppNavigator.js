import React from 'react'

import { createStackNavigator } from 'react-navigation-stack'
import { Button, Icon } from 'react-native-elements'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createSwitchNavigator } from 'react-navigation'
import { getActiveRoute, getTabBarIcon } from './app/services/NavigationService'

import Home from './app/screens/Home'
import StoreScreen from './app/screens/StoreScreen'
import CartScreen from './app/screens/CartScreen'
import StoreByCategory from './app/screens/StoreByCategory'

import MainScreen from './app/screens/account/MainScreen'
import EditProfile from './app/screens/account/EditProfile'
import AddAddressScreen from './app/screens/account/AddAddressScreen'

import LoginScreen from './app/screens/auth/LoginScreen'

import Header from './app/components/Header'

import { theme } from './app/constants/theme'
import Notification from './app/screens/Notification'
import CheckoutScreen from './app/screens/order/CheckoutScreen'

const AccountStack = createStackNavigator({
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
  }
}, {
  // navigationOptions: ({ navigation }) => {
  //   let tabBarVisible = false
  //   if (getActiveRoute(navigation.state).routeName === 'Main') tabBarVisible = true
  //   return {
  //     tabBarVisible
  //   }
  // }
  defaultNavigationOptions: {
    headerBackImage: <Button
      icon={
        <Icon
          type='material-community'
          name='arrow-left'
          color={theme.color.primary}
          size={28}
        />
      }
      onPress={() => props.navigation.navigate('Home')}
      buttonStyle={{
        backgroundColor: null
      }}
    />
  },
  headerBackTitleVisible: false
})

const CartStack = createStackNavigator({
  Cart: {
    screen: CartScreen,
    // params: { statusbar: 'dark-content' },
  },
  Checkout: {
    screen: CheckoutScreen
  }
}, {
  initialRouteName: 'Cart',
  headerBackTitleVisible: false
})

// const StoreStack = createStackNavigator({
//   Store: {
//     screen: StoreScreen,
//     params: { statusbar: 'light-content' },
//     navigationOptions: ({ navigation }) => {
//       return {
//         // header: <Header {...navigation} />,
//         // headerLeft: null
//         // headerTransparent: true
//         header: null
//       }
//     },
//     // headerMode: 'none'
//   },
// })

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    // params: { statusbar: 'dark-content' },
    navigationOptions: {
      headerBackTitle: null
    }
  },
  StoreByCategory: {
    screen: StoreByCategory,
    // params: { statusbar: 'dark-content' },
    navigationOptions: ({ navigation }) => {
      return {
        headerTintColor: theme.color.primary
      }
    }
  },
  Store: {
    screen: StoreScreen,
    params: { statusbar: 'light-content' },
    navigationOptions: ({ navigation }) => {
      return {
        // header: <Header {...navigation} />,
        // headerLeft: null
        // headerTransparent: true
        header: null
      }
    },
    // headerMode: 'none'
  },
}, {
  // navigationOptions: ({ navigation }) => {
  //   let tabBarVisible = false
  //   if (getActiveRoute(navigation.state).routeName === 'Home') tabBarVisible = true
  //   return {
  //     tabBarVisible
  //   }
  // }
})

const NotificationStack = createStackNavigator({
  Notification: {
    screen: Notification
  }
})

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    // params: { statusbar: 'dark-content' },
  }
}, {
  initialRouteName: 'Login'
})

const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Cart: CartStack,
  Notification: NotificationStack,
  Account: AccountStack,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) =>
      getTabBarIcon(navigation, focused, tintColor)
  }),
  tabBarOptions: {
    activeTintColor: theme.color.primary,
    inactiveTintColor: theme.color.gray,
    labelStyle: {
      fontFamily: theme.text.fonts.sfui,
      fontSize: 14,
      marginTop: -5
    },
    tabStyle: {
      marginBottom: -5
    }
  },
})

const AppNavigator = createStackNavigator({
  Tab: TabNavigator
}, {
  headerMode: "none"
})

const AppSwitch = createSwitchNavigator({
  Auth: AuthStack,
  Main: AppNavigator
}, {
  initialRouteName: 'Auth'
})


// const AppNavigator = createStackNavigator({
//   Main: TabNavigator
// })

export default AppSwitch