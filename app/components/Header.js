import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';
import { theme } from '../constants/theme';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function Header(props) {
  const { style, storeName } = props;
  return (
    <Animated.View
      style={{
        backgroundColor: style.headerStyle,
        // backgroundColor: 'red',
        height: 56,
        justifyContent: 'flex-end',
        borderBottomWidth: style.borderStyle,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        borderColor: '#ccc',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          icon={
            <AnimatedIcon
              type="material-community"
              name="arrow-left"
              color={style.backBtnStyle}
              size={28}
            />
          }
          onPress={() => props.navigation.goBack()}
          buttonStyle={{
            backgroundColor: null,
          }}
        />
        <Animated.Text
          style={[styles.storeName, { opacity: style.borderStyle }]}
        >
          {storeName}
        </Animated.Text>
        <Button
          icon={
            <AnimatedIcon
              type="material-community"
              name="bookmark-outline"
              color={style.backBtnStyle}
              size={28}
            />
          }
          onPress={() => props.goBack()}
          buttonStyle={{
            backgroundColor: null,
          }}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  storeName: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: 17,
    color: theme.color.primary,
  },
});

export default withNavigation(Header);
