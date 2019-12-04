/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
/* eslint-disable no-const-assign */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import SearchHeader from '../components/SearchHeader';
import { theme } from '../constants/theme';
import { search } from '../actions';

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
    <View>
      <SearchHeader />
      <ScrollView>
        <Text style={styles.title}>Search</Text>
        <SearchBar
          placeholder="Search"
          value={searchValue}
          platform="ios"
          inputContainerStyle={{ backgroundColor: theme.color.gray }}
          containerStyle={{ backgroundColor: null }}
          onChangeText={text => handleSearch(text)}
        />
        <Text>Search</Text>
        <View>
          <FlatList
            data={searchResult}
            keyExtractor={item => `rest-${item._id}`}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />
        </View>
      </ScrollView>
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
  },
});
