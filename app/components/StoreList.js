import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation'

import CategoryListItem from './StoreListItem';

class StoreList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [
        { id: 1, title: 'Store Name' },
        { id: 2, title: 'Store Name' },
        { id: 3, title: 'Store Name' },
        { id: 4, title: 'Store Name' },
        { id: 5, title: 'Store Name' },
        { id: 6, title: 'Store Name' },
      ]
    }

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
          data={this.state.categories}
          contentContainerStyle={styles.container}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) =>
            <View style={styles.wrapper}>
              <CategoryListItem
                item={item}
                onPress={() => this.props.navigation.navigate('Store', {
                  categoryName: item.title,
                  categoryId: item.id
                })}
              />
            </View>
          }
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 16
  },
  wrapper: {
    paddingHorizontal: 8
  }
});

export default withNavigation(StoreList)