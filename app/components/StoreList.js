/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import CategoryListItem from './StoreListItem';

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
  return (
    <View>
      <Text>MENU</Text>
      <FlatList
        data={props.storeList}
        contentContainerStyle={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.wrapper}>
            <CategoryListItem
              item={item}
              onPress={() =>
                props.navigation.navigate('Store', {
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
});

export default withNavigation(StoreList);
