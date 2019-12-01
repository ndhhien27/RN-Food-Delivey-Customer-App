/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import FilterHeader from '../components/FilterHeader';
import CuisinesItem from '../components/CuisinesItem';
import { theme } from '../constants/theme';

export default function FilterModal(props) {
  const { onPress } = props;
  const [cuisines, setCuisines] = useState([
    { id: 1, title: 'Rice', is_active: false },
    { id: 2, title: 'Pizza', is_active: false },
    { id: 3, title: 'Milk Tea', is_active: false },
    { id: 4, title: 'Chicken', is_active: false },
    { id: 5, title: 'Cake', is_active: false },
    { id: 6, title: 'Noodle', is_active: false },
    { id: 7, title: 'Fast Food', is_active: false },
    { id: 8, title: 'Shushi', is_active: false },
    { id: 9, title: 'Caffe', is_active: false },
    { id: 10, title: 'Desserts', is_active: false },
  ]);
  const [sortBy, setSortBy] = useState([
    { id: 1, title: 'Top Rated', is_active: false },
    { id: 2, title: 'Nearest Me', is_active: false },
    { id: 3, title: 'Most Popular', is_active: false },
    { id: 4, title: 'Open Now', is_active: false },
  ]);
  return (
    <View style={styles.container}>
      <FilterHeader onPress={onPress} />
      <ScrollView style={styles.bodyContainer}>
        <Text style={styles.label}>Cuisines</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {cuisines.map(item => (
            <CuisinesItem key={`${item.id}`} title={item.title} />
          ))}
        </View>
        <Text style={styles.label}>Filter</Text>
        <View>
          {sortBy.map(item => (
            <ListItem
              key={item.id}
              title={item.title}
              checkmark
              bottomDivider
              containerStyle={{ paddingHorizontal: 0 }}
              titleStyle={{ fontFamily: theme.text.fonts.sfpt, fontSize: 18 }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    paddingLeft: 16,
  },
  label: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: 18,
    color: theme.color.darkGray,
    textTransform: 'uppercase',
  },
});
