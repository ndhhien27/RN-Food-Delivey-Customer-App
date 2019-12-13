/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { theme } from '../constants/theme';

export default function IconWithBadge(props) {
  const { name, color, size } = props;
  const userInfo = useSelector(state => state.auth.userInfo);
  return (
    <View>
      <Icon name={name} size={size} color={color} />
      {userInfo.numNotification > 0 && (
        <View
          style={{
            // /If you're using react-native < 0.57 overflow outside of the parent
            // will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: 0,
            backgroundColor: 'red',
            borderRadius: 9,
            width: 18,
            height: 18,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontFamily: theme.text.fonts['sfpt-bold'],
            }}
          >
            {userInfo.numNotification}
          </Text>
        </View>
      )}
    </View>
  );
}
