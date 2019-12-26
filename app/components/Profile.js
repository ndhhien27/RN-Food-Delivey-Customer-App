import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { Avatar, Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import { theme } from '../constants/theme';

function Profile(props) {
  const { navigation, userInfo } = props;
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
          icon={{ type: 'material-community', name: 'account', size: 60 }}
          overlayContainerStyle={{ backgroundColor: theme.color.primary }}
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
        containerStyle={{
          position: 'absolute',
          zIndex: 1000,
          top: 0,
          right: 0,
        }}
        onPress={() => navigation.navigate('EditProfile')}
      />
    </View>
  );
}

export default withNavigation(Profile);
