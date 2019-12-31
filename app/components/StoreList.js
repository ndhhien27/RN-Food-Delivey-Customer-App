/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import StoreListItem from './StoreListItem';
import { theme } from '../constants/theme';

function StoreList(props) {
  // componentDidMount() {
  //   this.fetchEvent();
  // }

  // fetchEvent() {
  //   fetch('http://localhost:8080/graphql', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       query: `
  //       query {
  //         categories {
  //           _id
  //           title
  //         }
  //       }
  //       `
  //     })
  //   })
  //     .then(res => res.json())
  //     .then((result) => {
  //       console.log(result.data.categories)
  //       this.setState({
  //         categories: result.data.categories
  //       })
  //     })
  //     .catch(err => console.log(err))
  // }
  const { navigation } = props;
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  return (
    <View style={{ paddingTop: 16 }}>
      <View
        style={{
          paddingLeft: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{ fontFamily: theme.text.fonts['sfpd-medium'], fontSize: 20 }}
        >
          Rating
        </Text>
        <Button
          title="More"
          type="clear"
          titleStyle={styles.btnTitle}
          activeOpacity={0.5}
          TouchableComponent={TouchableHighlight}
          underlayColor="#fff"
          buttonStyle={styles.btn}
          onPress={() =>
            navigation.navigate('ListStoreByRatingStack', {
              data: [...props.data]
                .sort((rest1, rest2) => rest1.rating.avg - rest2.rating.avg)
                .reverse(),
              type: 'star',
            })
          }
        />
      </View>
      <FlatList
        data={[...props.data]
          .sort((rest1, rest2) => rest1.rating.avg - rest2.rating.avg)
          .reverse()
          .slice(0, 6)}
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.wrapper}>
            <StoreListItem
              item={item}
              onPress={() =>
                props.navigation.navigate('Restaurant', {
                  storeName: item.name,
                  restaurantId: item._id,
                })
              }
            />
          </View>
        )}
        keyExtractor={item => `${item._id}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  wrapper: {
    paddingHorizontal: 8,
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

export default withNavigation(StoreList);
