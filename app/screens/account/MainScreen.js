import React, { useState, userContext, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Profile from '../../components/Profile';
import Address from '../../components/Address';
import { theme } from '../../constants/theme';
import { AuthContext } from '../../context/AuthContext';

// import { theme } from '../../constants/theme';

export default function MainScreen(props) {
  // useEffect(() => {
  //   const _navListener = props.navigation.addListener('didFocus', () => {
  //     StatusBar.setBarStyle("dark-content");
  //   });

  //   return () => { _navListener.remove() }
  // })
  // eslint-disable-next-line no-unused-vars
  const { userInfo } = useContext(AuthContext);
  const [listAddress, setlistAddress] = useState([
    {
      id: 1,
      type: 'Home',
      info: '382, Ton Duc Thang, Lien Chieu, Da Nang',
    },
  ]);
  return (
    <View>
      <ScrollView
        alwaysBounceVertical={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <Profile userInfo={userInfo} />
        <Address listAddress={userInfo.position} />
        <Button
          title="Sign out"
          onPress={() => props.navigation.navigate('Auth')}
          buttonStyle={{
            backgroundColor: theme.color.primary,
            borderRadius: 8,
          }}
        />
      </ScrollView>
    </View>
  );
}

MainScreen.navigationOptions = () => ({
  headerStyle: {
    borderBottomWidth: 0,
  },
});
