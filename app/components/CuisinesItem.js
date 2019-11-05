import React from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export default function CuisinesItem(props) {
  const { title } = props;
  return (
    <View>
      <Button
        type="outline"
        title={title}
        buttonStyle={styles.btn}
        titleStyle={styles.title}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    borderRadius: 20,
    borderColor: theme.color.gray,
    marginRight: 8,
    marginTop: 8,
  },
  title: {
    fontFamily: theme.text.fonts.sfui,
    fontSize: 18,
    paddingHorizontal: 10,
    color: theme.color.gray,
  },
});
