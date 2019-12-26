import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { theme } from '../../constants/theme';

export default function StarInfo(props) {
  const { style, name, label, value, onPress, disabled } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.5}
      style={[
        {
          borderRightWidth: 1,
          borderColor: '#fff',
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
        },
        { ...style },
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon name={name} type="material-community" color="#fff" size={16} />
        <Text style={{ color: '#fff', fontSize: 16, paddingLeft: 6 }}>
          {value}
        </Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
    color: '#fff',
  },
});
