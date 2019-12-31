import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { theme } from '../constants/theme';

function Address(props) {
  const { listAddress, navigation } = props;
  // const renderItem = ({ item }) => (
  //   <ListItem
  //     title={item.type}
  //     subtitle={item.info}
  //     bottomDivider={true}
  //   />
  // )
  return (
    <View style={{ paddingVertical: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          type="material-community"
          name="map-marker-outline"
          size={20}
          iconStyle={{ paddingRight: 4 }}
        />
        <Text
          style={{
            fontSize: theme.text.size.lg,
            fontFamily: theme.text.fonts['sfpd-bold'],
            textTransform: 'uppercase',
          }}
        >
          Address
        </Text>
      </View>
      {listAddress.map(item => (
        <ListItem
          title="home"
          key={`${item.id}`}
          subtitle={item.address}
          bottomDivider
          containerStyle={{ paddingHorizontal: 0 }}
          titleStyle={{
            fontSize: 16,
            fontFamily: theme.text.fonts.sfpt,
            color: theme.color.darkGray,
            textTransform: 'uppercase',
          }}
          subtitleStyle={{
            fontSize: theme.text.size.md,
            fontFamily: theme.text.fonts.sfpt,
            marginTop: 6,
          }}
          chevron
          subtitleProps={{ numberOfLines: 1 }}
        />
      ))}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
        }}
      >
        {/* <Text
          style={{
            fontFamily: theme.text.fonts.sfpt,
            fontSize: theme.text.size.md,
            color: theme.color.primary,
          }}
        >
          Add new address
        </Text> */}
        <Button
          title="Add new address"
          titleStyle={{
            fontFamily: theme.text.fonts.sfpt,
            fontSize: theme.text.size.md,
            color: theme.color.primary,
          }}
          buttonStyle={{
            backgroundColor: null,
            padding: 0,
          }}
          onPress={() => navigation.navigate('AddAddress')}
          activeOpacity={0.5}
          TouchableComponent={TouchableHighlight}
          underlayColor="#fff"
        />
      </View>
    </View>
  );
}

export default withNavigation(Address);
