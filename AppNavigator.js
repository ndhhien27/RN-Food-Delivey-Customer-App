import React from 'react'

import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { getActiveRoute } from './app/services/NavigationService'

import Home from './app/screens/Home'
import StoreScreen from './app/screens/StoreScreen'
import CartScreen from './app/screens/CartScreen'
import StoreByCategory from './app/screens/StoreByCategory'

import MainScreen from './app/screens/account/MainScreen'
import EditProfile from './app/screens/account/EditProfile'
import AddAddressScreen from './app/screens/account/AddAddressScreen'

import Header from './app/components/Header'

import { theme } from './app/constants/theme'

const AccountStack = createStackNavigator({
  Main: {
    screen: MainScreen,
    params: { statusbar: 'dark-content' }
  },
  EditProfile: {
    screen: EditProfile,
    params: { statusbar: 'dark-content' },
  },
  AddAddress: {
    screen: AddAddressScreen,
    params: { statusbar: 'dark-content' },
  }
}, {
  navigationOptions: ({ navigation }) => {
    let tabBarVisible = false
    if (getActiveRoute(navigation.state).routeName === 'Main') tabBarVisible = true
    return {
      tabBarVisible
    }
  }
})

const CartStack = createStackNavigator({
  Cart: {
    screen: CartScreen,
    params: { statusbar: 'dark-content' },
  }
}, {
  initialRouteName: 'Cart'
})

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    params: { statusbar: 'dark-content' },
    navigationOptions: {
      headerBackTitle: null
    }
  },
  Store: {
    screen: StoreScreen,
    params: { statusbar: 'light-content' },
    navigationOptions: ({ navigation }) => {
      return {
        header: <Header {...navigation} />,
        headerLeft: null
      }
    }
  },
  StoreByCategory: {
    screen: StoreByCategory,
    params: { statusbar: 'dark-content' },
    navigationOptions: ({ navigation }) => {
      return {
        headerTintColor: theme.color.pantone
      }
    }
  }
}, {
  navigationOptions: ({ navigation }) => {
    let tabBarVisible = false
    if (getActiveRoute(navigation.state).routeName === 'Home') tabBarVisible = true
    return {
      tabBarVisible
    }
  }
})

const AppNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Cart: CartStack,
  Account: AccountStack
})


// const AppNavigator = createStackNavigator({
//   Main: TabNavigator
// })

export default AppNavigator