import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { theme } from '../../constants/theme';

export default function LoginScreen(props) {
  const { navigation } = props;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Welcome to</Text>
      </View>
      <Input
        placeholder="Email"
        labelStyle={styles.text}
        containerStyle={{ paddingHorizontal: -16 }}
      />
      <Input
        placeholder="Password"
        labelStyle={styles.text}
        containerStyle={{ paddingHorizontal: -16, paddingVertical: 22 }}
      />
      <Button
        title="Forgot Password"
        titleStyle={{
          color: theme.color.primary,
          ...styles.text,
        }}
        buttonStyle={{
          backgroundColor: null,
        }}
        activeOpacity={0.5}
      />
      <Button
        title="Login"
        buttonStyle={{
          backgroundColor: theme.color.primary,
          ...theme.shadow,
          marginVertical: 22,
        }}
        onPress={() => navigation.navigate('Main')}
        activeOpacity={0.5}
      />
      <Button
        title="Signup"
        titleStyle={{
          color: theme.color.primary,
        }}
        buttonStyle={{
          backgroundColor: null,
        }}
        activeOpacity={0.5}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: 20,
  },
});
