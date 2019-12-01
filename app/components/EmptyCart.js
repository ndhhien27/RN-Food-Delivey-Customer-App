import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { theme } from '../constants/theme';

export default function EmptyCart() {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        icon={
          <Icon
            type="material-community"
            name="cart-outline"
            color={theme.color.primary}
            size={100}
          />
        }
        disabled
        disabledStyle={{
          backgroundColor: '#fff',
          width: 200,
          height: 200,
          borderRadius: 100,
        }}
      />
      <Text style={styles.text}>Cart Empty</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.lightGray,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.color.darkGray,
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: 24,
    marginTop: 50,
  },
});
