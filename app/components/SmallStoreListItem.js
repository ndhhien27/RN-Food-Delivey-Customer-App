/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { navigate } from '../services/NavigationService';
import { theme } from '../constants/theme';
import { image } from '../constants/images';

export default function SmallStoreListItem({ item }) {
  const [bookmark, setBookmark] = useState(false);
  return (
    <TouchableOpacity
      style={styles.shadow}
      onPress={() => navigate('Restaurant', { restaurantId: item._id })}
      activeOpacity={0.5}
    >
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: item.img_url }}
          style={{
            width: 88,
            height: 88,
            resizeMode: 'cover',
            borderRadius: 4,
          }}
        />
        <View style={{ paddingHorizontal: 8, flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.address} numberOfLines={2}>
            {item.position.address}
          </Text>
          {/* <Icon
            type="material-community"
            name="star"
            color={theme.color.primary}
            size={15}
          /> */}
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
          }}
          onPress={() =>
            setBookmark(prev => {
              return !bookmark;
            })
          }
        />
      </View>
    </TouchableOpacity>
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
    elevation: 10,
  },
  name: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.md,
  },
  address: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.sm,
    color: theme.color.darkGray,
  },
});
