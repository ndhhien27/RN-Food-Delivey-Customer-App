import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { theme } from '../constants/theme';

function FilterHeader(props) {
  const { onPress } = props;
  return (
    <View style={{ justifyContent: 'flex-end', height: 70 }}>
      <View style={styles.container}>
        <Button
          title="Reset"
          titleStyle={[styles.titleBtn, { color: 'black' }]}
          type="clear"
        />
        <Text style={styles.title}>Filters</Text>
        <Button
          title="Done"
          titleStyle={[styles.titleBtn, { color: theme.color.primary }]}
          onPress={onPress}
          type="clear"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: theme.color.darkGray,
    borderBottomWidth: 0.3,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: null,
  },
  titleBtn: {
    fontFamily: theme.text.fonts['sfpt-medium'],
  },
  title: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: 18,
  },
});

export default FilterHeader;
