import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { theme } from '../../constants/theme';

function OrderModal(props) {
  const { navigation, hideModal } = props;
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'space-evenly', flex: 1 }}
    >
      <Icon
        type="material-community"
        name="check"
        color={theme.color.primary}
        size={80}
        containerStyle={{
          borderColor: 'rgba(255,140,0,0.3)',
          borderWidth: 6,
          width: 120,
          height: 120,
          borderRadius: 60,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      />
      <Text style={styles.title}>Success</Text>
      <Button
        activeOpacity={0.5}
        TouchableComponent={TouchableHighlight}
        underlayColor="#fff"
        title="Continue Shopping"
        onPress={() => {
          navigation.navigate('Home');
          hideModal();
        }}
        buttonStyle={{
          backgroundColor: theme.color.primary,
          width: 235,
          height: 44,
          borderRadius: 22,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: 28,
  },
});

export default withNavigation(OrderModal);
