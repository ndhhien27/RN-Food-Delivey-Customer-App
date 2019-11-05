import React, { useState } from 'react';
import { View, FlatList, StatusBar, Animated } from 'react-native';

import MenuItem from '../components/MenuItem';
import Banner from '../components/Banner';

import Header from '../components/Header';
import { theme } from '../constants/theme';

const { debounce } = require('lodash');

function StoreScreen(props) {
  const { navigation } = props;
  const storeName = navigation.getParam('storeName');
  const [isLight, setIsLight] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [foods, setFoods] = useState([
    {
      id: 1,
      title: 'Bun',
      foods: [
        { id: 1, title: 'Bun cha', price: '10000', is_active: false },
        { id: 2, title: 'Bun cha', price: '11000', is_active: false },
        { id: 3, title: 'Bun cha', price: '12000', is_active: false },
      ],
    },
    {
      id: 2,
      title: 'Pho',
      foods: [
        { id: 4, title: 'Bun cha', price: '13000', is_active: false },
        { id: 5, title: 'Bun cha', price: '14000', is_active: false },
        { id: 6, title: 'Bun cha', price: '15000', is_active: false },
      ],
    },
    {
      id: 3,
      title: 'Ga',
      foods: [
        { id: 7, title: 'Bun cha', price: '16000', is_active: false },
        { id: 8, title: 'Bun cha', price: '17000', is_active: false },
      ],
    },
    {
      id: 4,
      title: 'Lau',
      foods: [
        { id: 9, title: 'Bun cha', price: '16000', is_active: false },
        { id: 10, title: 'Bun cha', price: '17000', is_active: false },
      ],
    },
    {
      id: 5,
      title: 'Trang mieng',
      foods: [
        { id: 11, title: 'Bun cha', price: '16000', is_active: false },
        { id: 12, title: 'Bun cha', price: '17000', is_active: false },
      ],
    },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const checkStatusBarColor = () => {
    // eslint-disable-next-line no-underscore-dangle
    const check = scrollY._value < 120;
    if (isLight !== check) setIsLight(check);
    // console.log(check)
  };

  const headerStyle = scrollY.interpolate({
    inputRange: [0, 150, 260, 262],
    outputRange: [
      'rgba(255,255,255,0)',
      'rgba(255,255,255,0.7)',
      'rgba(255,255,255,0.7)',
      'rgba(255,255,255,1)',
    ],
    extrapolate: 'clamp',
  });
  const borderStyle = scrollY.interpolate({
    inputRange: [0, 230, 262],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  const backBtnStyle = scrollY.interpolate({
    inputRange: [0, 150, 262],
    outputRange: ['#fff', '#fff', theme.color.primary],
    extrapolate: 'clamp',
  });

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

  // console.log(scrollY)
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        animated
        barStyle={isLight ? 'light-content' : 'dark-content'}
      />
      <FlatList
        data={foods}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { listener: debounce(checkStatusBarColor, 16) }
        )}
        contentContainerStyle={{ paddingBottom: 44 }}
        renderItem={({ item }) => (
          <MenuItem menu={item} storeName={storeName} />
        )}
        keyExtractor={item => `${item.id}`}
        // contentContainerStyle={styles.container}
        ListHeaderComponent={
          // eslint-disable-next-line react/prop-types
          <Banner storeName={navigation.state.params.storeName} />
        }
      />
      <Header
        style={{
          headerStyle,
          borderStyle,
          backBtnStyle,
        }}
        storeName={storeName}
      />
    </View>
  );
}

// StoreScreen.navigationOptions = ({ navigation }) => {
//   console.log(navigation.state.params)
// return {
//   // title: navigation.getParam('categoryName'),
//   // headerTransparent: navigation.state.params.header
//   header: <Header {...navigation} />,
//   headerLeft: null
// }
// }

export default StoreScreen;
