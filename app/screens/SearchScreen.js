/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable no-const-assign */
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import SearchHeader from '../components/SearchHeader';
import { theme } from '../constants/theme';
import { search } from '../actions';
import SmallStoreListItem from '../components/SmallStoreListItem';

export default function SearchScreen() {
  const [searchValue, setSearchValue] = useState('');
  const searchResult = useSelector(
    state => state.restaurantReducer.searchResult
  );
  const dispatch = useDispatch();
  const handleSearch = text => {
    setSearchValue(text);
    dispatch(search(text));
  };
  return (
    <View style={{ flex: 1 }}>
      <SearchHeader />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Search</Text>
        <SearchBar
          placeholder="Search"
          value={searchValue}
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          inputContainerStyle={{
            backgroundColor: theme.color.gray,
            paddingHorizontal: 0,
          }}
          containerStyle={{ backgroundColor: null, paddingHorizontal: 16 }}
          onChangeText={text => handleSearch(text)}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={searchResult}
            keyExtractor={item => `rest-${item._id}`}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
            }}
            renderItem={({ item }) => <SmallStoreListItem item={item} />}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: 34,
    paddingLeft: 16,
  },
});
