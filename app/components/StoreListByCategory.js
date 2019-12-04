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

function StoreListByCategory(props) {
  const [bookmark, setBookmark] = useState(false);
  const { data } = props;
  return (
    <FlatList
      data={data}
      keyExtractor={item => `${item._id}`}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      alwaysBounceVertical={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.shadow}
          onPress={() =>
            props.navigation.navigate('Store', { restaurantId: item._id })
          }
        >
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: 'http://via.placeholder.com/88x88' }}
              style={{
                width: 88,
                height: 88,
                resizeMode: 'cover',
                borderRadius: 4,
              }}
            />
            <View style={{ paddingLeft: 16, flex: 1 }}>
              <Text>{item.name}</Text>
              <Text>{item.address}</Text>
              <Icon
                type="material-community"
                name="star"
                color={theme.color.primary}
                size={15}
              />
            </View>
            <Button
              icon={
                <Icon
                  type="material-community"
                  name={bookmark ? 'bookmark' : 'bookmark-outline'}
                  color={theme.color.primary}
                />
              }
              buttonStyle={{
                backgroundColor: null,
                padding: 0,
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              onPress={() =>
                setBookmark(prev => {
                  return !bookmark;
                })
              }
            />
          </View>
        </TouchableOpacity>
      )}
      ListHeaderComponent={<Text>123</Text>}
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
