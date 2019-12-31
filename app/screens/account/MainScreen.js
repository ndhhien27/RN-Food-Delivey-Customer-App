import React, { useState, userContext, useContext } from 'react';
import { View, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import Profile from '../../components/Profile';
import Address from '../../components/Address';
import { theme } from '../../constants/theme';
import { signOut } from '../../actions/index';
import PaymentInfo from '../../components/PaymentInfo';

// import { theme } from '../../constants/theme';

export default function MainScreen(props) {
  // useEffect(() => {
  //   const _navListener = props.navigation.addListener('didFocus', () => {
  //     StatusBar.setBarStyle("dark-content");
  //   });

  //   return () => { _navListener.remove() }
  // })
  // eslint-disable-next-line no-unused-vars
  // const { userInfo } = useContext(AuthContext);
  const userInfo = useSelector(state => state.auth.userInfo);
  const dispatch = useDispatch();
  const [listAddress, setlistAddress] = useState([
    {
      id: 1,
      type: 'Home',
      info: '382, Ton Duc Thang, Lien Chieu, Da Nang',
    },
  ]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <Profile userInfo={userInfo} />
        <View style={styles.info}>
          <Address listAddress={userInfo.position} />
          <PaymentInfo payment={userInfo.payment} />
        </View>
        <View style={styles.btnGroup}>
          <Button
            containerStyle={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
            icon={
              <Icon
                type="material-community"
                name="settings-outline"
                color={theme.color.primary}
                containerStyle={{ marginRight: 8 }}
              />
            }
            activeOpacity={0.5}
            TouchableComponent={TouchableHighlight}
            underlayColor="#fff"
            title="Setting"
            type="clear"
            titleStyle={{
              color: theme.color.primary,
              fontFamily: theme.text.fonts['sfpd-bold'],
              fontSize: theme.text.size.lg,
            }}
            buttonStyle={{
              paddingHorizontal: 0,
            }}
          />
          <Button
            containerStyle={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
            icon={
              <Icon
                type="material-community"
                name="logout-variant"
                color={theme.color.primary}
                containerStyle={{ marginRight: 8 }}
              />
            }
            title="Sign out"
            type="clear"
            titleStyle={{
              color: theme.color.primary,
              fontFamily: theme.text.fonts['sfpd-bold'],
              fontSize: theme.text.size.lg,
            }}
            onPress={() => dispatch(signOut())}
            buttonStyle={{
              paddingHorizontal: 0,
            }}
            activeOpacity={0.5}
            TouchableComponent={TouchableHighlight}
            underlayColor="#fff"
          />
        </View>
      </ScrollView>
    </View>
  );
}

MainScreen.navigationOptions = () => ({
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    elevation: 0,
  },
});

const styles = StyleSheet.create({
  btnGroup: {
    marginTop: 16,
  },
  info: {
    paddingTop: 16,
  },
});
