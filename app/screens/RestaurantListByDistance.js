/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Button, Icon, Divider } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { theme } from '../constants/theme';
import LargeStoreChildElementNoShadow from '../components/LargeStoreChildElementNoShadow';

function StoreListByCategory(props) {
  const [bookmark, setBookmark] = useState(false);
  const { navigation } = props;
  const { data, type } = navigation.state.params;
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <LargeStoreChildElementNoShadow item={item} type={type} />
      )}
      keyExtractor={item => `${item._id}`}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <Divider style={{ backgroundColor: theme.color.darkGray }} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  shadow: {
    ...theme.shadow,
    marginBottom: 15,
  },
  itemContainer: {
    padding: 18,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
});

export default withNavigation(StoreListByCategory);
