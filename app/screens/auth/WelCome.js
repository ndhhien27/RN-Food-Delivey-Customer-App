import React, { useEffect } from 'react';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { theme } from '../../constants/theme';
import { image } from '../../constants/images';

export default function WelCome(props) {
  const { navigation } = props;
  const checkAuthtoken = async () => {
    await AsyncStorage.getItem('@auth_token');
  };
  return (
    <ImageBackground style={styles.container} source={image.bg}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        colors={['#000', 'transparent']}
        style={{ flex: 1 }}
      >
        <View style={{ paddingHorizontal: 16, flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.text}>Delivered fast Food to your door.</Text>
          </View>
          <Button
            title="Login"
            buttonStyle={{
              backgroundColor: theme.color.primary,
              borderRadius: 22,
            }}
            activeOpacity={0.5}
            containerStyle={{ paddingBottom: 44 }}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 16,
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: theme.text.fonts['sfpd-bold'],
    fontSize: 50,
    textTransform: 'uppercase',
    color: '#fff',
  },
});

WelCome.navigationOptions = () => {
  return {
    header: null,
  };
};
