/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import FilterHeader from '../components/FilterHeader';
import CuisinesItem from '../components/CuisinesItem';

export default function FilterModal(props) {
  const { onPress } = props;
  const [cuisines, setCuisines] = useState([
    { id: 1, title: 'Rice', is_active: false },
    { id: 2, title: 'Pizza', is_active: false },
    { id: 4, title: 'Milk Tea', is_active: false },
    { id: 4, title: 'Chicken', is_active: false },
    { id: 5, title: 'Cake', is_active: false },
    { id: 6, title: 'Noodle', is_active: false },
    { id: 7, title: 'Fast Food', is_active: false },
    { id: 8, title: 'Shushi', is_active: false },
    { id: 9, title: 'Caffe', is_active: false },
    { id: 10, title: 'Desserts', is_active: false },
  ]);
  return (
    <View>
      <FilterHeader onPress={onPress} />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {cuisines.map(item => (
          <CuisinesItem title={item.title} />
        ))}
      </View>
    </View>
  );
}
