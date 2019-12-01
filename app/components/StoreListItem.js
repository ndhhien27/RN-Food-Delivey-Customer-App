/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Icon, Button } from 'react-native-elements';

import { theme } from '../constants/theme';

function StoreListItem(props) {
  const { item, onPress } = props;

  const [bookmark, setBookmark] = useState(false);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={styles.shadow}>
        <View style={styles.container}>
          <ImageBackground
            style={styles.image}
            source={{ uri: 'http://via.placeholder.com/180x180' }}
          >
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
                top: 10,
                right: 10,
              }}
              onPress={() =>
                setBookmark(prev => {
                  return !bookmark;
                })
              }
            />
            <Button
              icon={
                <Icon
                  type="material-community"
                  name="star"
                  color="#fff"
                  size={15}
                />
              }
              title="4.8"
              disabledTitleStyle={{ color: '#fff', fontSize: 15 }}
              disabled
              disabledStyle={{
                backgroundColor: theme.color.primary,
                borderRadius: 8,
                paddingVertical: 2,
              }}
              containerStyle={{
                position: 'absolute',
                alignSelf: 'center',
                bottom: 10,
                left: 10,
              }}
            />
          </ImageBackground>
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
            <Text numberOfLines={1}>{item.address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 180,
    borderTopRightRadius: theme.radius['2xs'],
    borderTopLeftRadius: theme.radius['2xs'],
    resizeMode: 'cover',
  },
  container: {
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: 180,
  },
  shadow: theme.shadow,
  info: {
    padding: 8,
  },
  name: {
    fontSize: 17,
    marginBottom: 8,
    fontFamily: theme.text.fonts.sfpt,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    flex: 1,
    fontSize: 17,
    color: '#888',
  },
  priceText: {
    textTransform: 'uppercase',
    color: '#0f0',
  },
});

export default StoreListItem;
