/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import CategoryListItem from './StoreListItem';

class StoreList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        { id: 1, title: 'Store Name 1' },
        { id: 2, title: 'Store Name 2' },
        { id: 3, title: 'Store Name 3' },
        { id: 4, title: 'Store Name 4' },
        { id: 5, title: 'Store Name 5' },
        { id: 6, title: 'Store Name 6' },
      ],
    };
  }

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

  render() {
    return (
      <View>
        <Text>MENU</Text>
        <FlatList
          data={this.props.storeList}
          contentContainerStyle={styles.container}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.wrapper}>
              <CategoryListItem
                item={item}
                onPress={() =>
                  this.props.navigation.navigate('Store', {
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
