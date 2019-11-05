import React from 'react';
import { ScrollView } from 'react-native';
import StoreList from '../components/StoreList';
import MyCarousel from '../components/Carousel';
import CategoryWithIcon from '../components/CategoryWithIcon';

function Home() {
  // useEffect(() => {
  //   const _navListener = props.navigation.addListener('didFocus', () => {
  //     StatusBar.setBarStyle("dark-content");
  //   });

  //   return () => { _navListener.remove() }
  // }, [])

  return (
    <ScrollView>
      {/* <StatusBar barStyle='dark-content' /> */}
      <MyCarousel />
      <CategoryWithIcon />
      <StoreList />
    </ScrollView>
  );
}

Home.navigationOptions = {
  title: 'Home',
  // headerTransparent: 'true'
};

export default Home;
