import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, StyleSheet, StatusBar, Animated, Dimensions } from 'react-native';

import axios from 'axios'

import MenuItem from '../components/FoodItem'
import Banner from '../components/Banner'

import Header from '../components/Header'
import { theme } from '../constants/theme'

const { debounce } = require('lodash')


function StoreScreen(props) {

  const { navigation } = props

  const name = navigation.getParam('categoryName')

  const [isLight, setIsLight] = useState(true)

  const [isBookmark, setIsBookmark] = useState(false)

  const [foods, setFoods] = useState([
    {
      id: 1, title: 'Bun', foods: [
        { id: 1, title: 'Bun cha', price: '10000' },
        { id: 2, title: 'Bun cha', price: '10000' },
        { id: 3, title: 'Bun cha', price: '10000' },

      ]
    },
    {
      id: 2, title: 'Pho', foods: [
        { id: 4, title: 'Bun cha', price: '10000' },
        { id: 5, title: 'Bun cha', price: '10000' },
        { id: 6, title: 'Bun cha', price: '10000' },

      ]
    },
    {
      id: 3, title: 'Ga', foods: [
        { id: 7, title: 'Bun cha', price: '10000' },
        { id: 8, title: 'Bun cha', price: '10000' },

      ]
    }
  ])


  const [scrollY, setScrollY] = useState(new Animated.Value(0))


  const checkStatusBarColor = () => {
    const check = scrollY._value < 180;
    if (isLight !== check) setIsLight(check);
    console.log(check)
  }

  useEffect(() => {
    const headerStyle = scrollY.interpolate({
      inputRange: [0, 150, 262],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,1)'],
      extrapolate: 'clamp'
    })
    const borderStyle = scrollY.interpolate({
      inputRange: [0, 230, 262],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    const backBtnStyle = scrollY.interpolate({
      inputRange: [0, 150, 262],
      outputRange: ['#fff', '#fff', theme.color.pantone],
      extrapolate: 'clamp'
    })
    navigation.setParams({ header: headerStyle, borderStyle, backBtn: backBtnStyle, isLight })
    // const _navListener = navigation.addListener('didFocus', () => {
    //   StatusBar.setBarStyle("light-content");
    // });

    // return () => { _navListener.remove(); console.log('removed') }
  }, [])

  // useEffect(() => {
  //   // const _navListener = navigation.addListener('didFocus', payload => {
  //   //   StatusBar.setBarStyle("light-content");
  //   // });
  //   StatusBar.setBarStyle(isLight ? 'light-content' : 'dark-content', true)

  //   // return () => { _navListener.remove(); console.log('abc') }

  // }, [scrollY._value])

  // const headerStyle = scrollY.interpolate({
  //   headerTransparent: false
  // })

  // const { cart, addFoodToCart } = useContext(CartContext)

  // useEffect(() => {
  //   fetchFood()
  // }, [])

  // const fetchFood = () => {
  //   axios({
  //     url: 'http://localhost:8080/graphql',
  //     method: 'post',
  //     data: {
  //       query: `
  //         query FoodByCategory($categoryId: ID!) {
  //           foodByCategory(categoryId: $categoryId){
  //             _id
  //             title
  //             price
  //           }
  //         }
  //       `,
  //       variables: {
  //         categoryId: categoryId
  //       }
  //     }
  //   }).then((result) => {
  //     setFoods(result.data.data.foodByCategory)
  //   }).catch((err) => console.log(err));
  // }

  console.log(scrollY)
  return (
    <View style={{ flex: 1 }}>
      <StatusBar animated barStyle={isLight ? 'light-content' : 'dark-content'} />
      <FlatList
        data={foods}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { listener: debounce(checkStatusBarColor, 16) }
        )}
        // contentContainerStyle={{ marginTop: 350 }}
        renderItem={({ item }) =>
          <MenuItem menu={item} />}
        keyExtractor={item => `${item.id}`}
        // contentContainerStyle={styles.container}
        ListHeaderComponent={<Banner />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 8
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
})



// StoreScreen.navigationOptions = ({ navigation }) => {
//   console.log(navigation.state.params)
// return {
//   // title: navigation.getParam('categoryName'),
//   // headerTransparent: navigation.state.params.header
//   header: <Header {...navigation} />,
//   headerLeft: null
// }
// }

export default StoreScreen