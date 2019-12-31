/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { withNavigation, FlatList } from 'react-navigation';
import { Divider, Button } from 'react-native-elements';
import LargeStoreChildElementNoShadow from './LargeStoreChildElementNoShadow';
import { theme } from '../constants/theme';
import { navigate } from '../services/NavigationService';

function PopularList({ data }) {
  // eslint-disable-next-line no-unused-vars
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Near me</Text>
        <Button
          title="More"
          type="clear"
          titleStyle={styles.btnTitle}
          buttonStyle={styles.btn}
          onPress={() =>
            navigate('RestaurantByDistance', { data, type: 'distance' })
          }
          activeOpacity={0.5}
          TouchableComponent={TouchableHighlight}
          underlayColor="#fff"
        />
      </View>
      <FlatList
        data={data
          .sort((rest1, rest2) => rest1.distance - rest2.distance)
          .slice(0, 3)}
        renderItem={({ item }) => (
          <LargeStoreChildElementNoShadow item={item} type="distance" />
        )}
        keyExtractor={item => `${item._id}`}
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnTitle: {
    fontFamily: theme.text.fonts['sfpd-medium'],
    fontSize: 20,
    color: theme.color.primary,
  },
  btn: {
    padding: 0,
    paddingRight: 16,
  },
});

export default withNavigation(PopularList);
