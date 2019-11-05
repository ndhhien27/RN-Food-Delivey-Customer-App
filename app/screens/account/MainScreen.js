import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

import Profile from '../../components/Profile';
import Address from '../../components/Address';

// import { theme } from '../../constants/theme';

export default function MainScreen(props) {
  // useEffect(() => {
  //   const _navListener = props.navigation.addListener('didFocus', () => {
  //     StatusBar.setBarStyle("dark-content");
  //   });

  //   return () => { _navListener.remove() }
  // })
  // eslint-disable-next-line no-unused-vars
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
        <Profile />
        <Address listAddress={listAddress} />
        <Button onPress={() => props.navigation.navigate('Auth')} />
      </ScrollView>
    </View>
  );
}

MainScreen.navigationOptions = () => ({
  headerStyle: {
    borderBottomWidth: 0,
  },
});
