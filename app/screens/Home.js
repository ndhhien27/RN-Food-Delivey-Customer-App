import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import StoreList from '../components/StoreList';
import MyCarousel from '../components/Carousel';
import CategoryWithIcon from '../components/CategoryWithIcon';
import PopularList from '../components/PopularList';
import { theme } from '../constants/theme';
import RestaurantService from '../services/RestaurantService';

function Home() {
  // useEffect(() => {
  //   const _navListener = props.navigation.addListener('didFocus', () => {
  //     StatusBar.setBarStyle("dark-content");
  //   });

  //   return () => { _navListener.remove() }
  // }, [])

  const [state, setstate] = useState([]);
  useEffect(() => {
    RestaurantService.getRestaurants(
      res => setstate(res.data.data.restaurants),
      err => console.log(err)
    );
  }, []);
  return (
    <ScrollView>
      {/* <StatusBar barStyle='dark-content' /> */}
      <MyCarousel />
      <CategoryWithIcon />
      <StoreList storeList={state} />
      <PopularList />
    </ScrollView>
  );
}

Home.navigationOptions = ({ navigation }) => {
  return {
    title: 'Home',
    // headerTransparent: 'true'
    headerRight: (
      <Button
        icon={
          <Icon
            type="material-community"
            name="magnify"
            size={theme.icon.size.md}
          />
        }
        type="clear"
        onPress={() => navigation.navigate('Search')}
      />
    ),
  };
};

export default Home;
