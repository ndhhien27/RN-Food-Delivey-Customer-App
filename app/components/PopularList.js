import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation, FlatList } from 'react-navigation';
import { Divider } from 'react-native-elements';
import LargeStoreChildElementNoShadow from './LargeStoreChildElementNoShadow';
import { theme } from '../constants/theme';

function PopularList() {
  // eslint-disable-next-line no-unused-vars
  const [state, setstate] = useState([
    {
      id: 1,
      title: 'Store Name 1',
      address: '382 Ton Duc Thang',
      bookmark: 4.8,
      promotion: 'Free delivery',
    },
    {
      id: 2,
      title: 'Store Name 2',
      address: '382 Ton Duc Thang',
      bookmark: 4.8,
      promotion: 'Free delivery',
    },
    {
      id: 3,
      title: 'Store Name 3',
      address: '382 Ton Duc Thang',
      bookmark: 4.8,
      promotion: 'Free delivery',
    },
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular</Text>
      <FlatList
        data={state}
        renderItem={({ item }) => (
          <LargeStoreChildElementNoShadow item={item} />
        )}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={() => (
          <Divider style={{ backgroundColor: theme.color.darkGray }} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: theme.text.fonts['sfpd-medium'],
    fontSize: 20,
  },
  container: {
    paddingLeft: 16,
  },
});

export default withNavigation(PopularList);
