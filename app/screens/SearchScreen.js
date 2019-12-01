import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import SearchHeader from '../components/SearchHeader';
import { theme } from '../constants/theme';

export default function SearchScreen() {
  return (
    <View>
      <SearchHeader />
      <ScrollView>
        <Text style={styles.title}>Search</Text>
        <SearchBar
          placeholder="Search"
          platform="ios"
          inputContainerStyle={{ backgroundColor: theme.color.gray }}
          containerStyle={{ backgroundColor: null }}
        />
        <Text>Search</Text>
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
