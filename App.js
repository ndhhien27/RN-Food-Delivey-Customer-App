/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet, Text, View, StatusBar, YellowBox } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppSwitch from './AppNavigator';
import CartProvider from './app/context/CartContext';
import { getActiveRoute } from './app/services/NavigationService';
import AuthProvider from './app/context/AuthContext';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

const AppContainer = createAppContainer(AppSwitch);

export default function App() {
  // return (
  //   <CartProvider>
  //     <AppContainer
  //       onNavigationStateChange={(prevState, currentState, action) => {
  //         const currentScreen = getActiveRoute(currentState);
  //         const prevScreen = getActiveRoute(prevState);
  //         if (prevScreen.routeName !== currentScreen.routeName) {
  //           let statusTheme = '';
  //           if (!currentScreen.params) {
  //             statusTheme = 'dark-content';
  //           } else {
  //             statusTheme = currentScreen.params.statusbar;
  //           }
  //           // console.log(statusTheme, currentScreen.params);
  //           StatusBar.setBarStyle(statusTheme);
  //         }
  //       }}
  //     />
  //   </CartProvider>
  // );
  return (
    <AuthProvider>
      <CartProvider>
        <AppContainer />
      </CartProvider>
    </AuthProvider>
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
