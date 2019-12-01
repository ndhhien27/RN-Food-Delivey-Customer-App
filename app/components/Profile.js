import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { AuthContext } from '../context/AuthContext';

import { theme } from '../constants/theme';

function Profile(props) {
  const { userInfo } = useContext(AuthContext);
  const { navigation } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Avatar
          rounded
          source={{ uri: 'http://via.placeholder.com/86x86' }}
          size={86}
        />
        <View
          style={{
            paddingLeft: 16,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: theme.text.fonts['sfpt-bold'],
            }}
          >
            {`${userInfo.fName} ${userInfo.lName}`}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: theme.text.fonts.sfpt,
            }}
          >
            {userInfo.email}
          </Text>
        </View>
      </View>
      <Button
        icon={
          <Icon
            type="material-community"
            name="account-edit"
            color={theme.color.primary}
            size={30}
          />
        }
        buttonStyle={{
          backgroundColor: null,
          padding: 0,
        }}
        onPress={() => navigation.navigate('EditProfile', { userInfo })}
      />
    </View>
  );
}

export default withNavigation(Profile);
