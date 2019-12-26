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
import { Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { theme } from '../constants/theme';
import SmallStoreListItem from '../components/SmallStoreListItem';

function StoreListByCategory(props) {
  const [bookmark, setBookmark] = useState(false);
  const { data } = props;
  return (
    <View style={{ backgroundColor: theme.color.lightGray, flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={item => `${item._id}`}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          backgroundColor: theme.color.lightGray,
        }}
        alwaysBounceVertical={false}
        renderItem={({ item }) => <SmallStoreListItem item={item} />}
      />
    </View>
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
