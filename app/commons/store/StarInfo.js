import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default function StarInfo(props) {
  const { style } = props;
  return (
    <View
      style={[
        {
          borderRightWidth: 1,
          borderColor: '#fff',
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
        },
        { ...style },
      ]}
    >
      <View style={{ flexDirection: 'row' }}>
        <Icon
          name="bookmark"
          type="material-community"
          color="#fff"
          size={16}
        />
        <Text style={{ color: '#fff', fontSize: 16, paddingLeft: 6 }}>4.8</Text>
      </View>
      <Text
        style={{
          color: '#fff',
          fontSize: 16,
        }}
      >
        djadjaslkd
      </Text>
    </View>
  );
}
