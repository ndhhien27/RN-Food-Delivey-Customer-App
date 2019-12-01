import React from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { theme } from '../constants/theme';

function SearchHeader(props) {
  const { navigation } = props;
  return (
    <View>
      <Button
        icon={
          <Icon
            type="material-community"
            name="close"
            size={theme.icon.size.md}
          />
        }
        type="clear"
        containerStyle={{
          height: 88,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}
        onPress={() => navigation.goBack(null)}
      />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'flex-end',
//   },
//   title: {
//     fontFamily: theme.text.fonts['sfpt-bold'],
//     fontSize: 34,
//   },
// });

export default withNavigation(SearchHeader);
