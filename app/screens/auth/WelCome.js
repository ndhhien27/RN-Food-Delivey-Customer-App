/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { theme } from '../../constants/theme';
import { image } from '../../constants/images';
import { fetchAllRestaurant, getUserInfo } from '../../actions/index';
import { removeQuotes } from '../../helpers/string';
import { navigate } from '../../services/NavigationService';

function WelCome(props) {
  useEffect(() => {
    // clearStorage();
    loadAuthToken();
  }, []);

  const clearStorage = async () => {
    await AsyncStorage.clear();
    const auth = await AsyncStorage.clear();
    const authParse = JSON.parse(auth);
    console.log('auth', authParse);
    navigate('Auth');
  };

  const loadAuthToken = async () => {
    const auth = await AsyncStorage.getItem('persist:auth');
    const authParse = JSON.parse(auth);
    console.log('auth', authParse);
    if (!authParse) navigate('Auth', null);
    else {
      console.log(removeQuotes(authParse.authToken));
      if (removeQuotes(authParse.authToken)) {
        console.log(removeQuotes(authParse.authToken));
        const userId = removeQuotes(authParse.userId);
        props.getUserInfo(userId, removeQuotes(authParse.authToken));
      } else navigate('Auth', null);
    }
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
          <ActivityIndicator size="large" />
          {/* <Button
            title="Login"
            buttonStyle={{
              backgroundColor: theme.color.primary,
              borderRadius: 22,
            }}
            activeOpacity={0.5}
            containerStyle={{ paddingBottom: 44 }}
            onPress={() => navigation.navigate('Login')}
          /> */}
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

function mapStateToProps(state) {
  return {
    restaurantList: state.restaurantReducer.fullList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchAllRestaurant,
      getUserInfo,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelCome);
