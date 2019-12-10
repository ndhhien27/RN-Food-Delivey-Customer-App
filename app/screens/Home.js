/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import StoreList from '../components/StoreList';
import MyCarousel from '../components/Carousel';
import CategoryWithIcon from '../components/CategoryWithIcon';
import PopularList from '../components/PopularList';
import { theme } from '../constants/theme';
import RestaurantService from '../services/RestaurantService';
import {
  fetchAllRestaurant,
  getUserInfo,
  getNotification,
} from '../actions/index';

function Home(props) {
  // useEffect(() => {
  //   const _navListener = props.navigation.addListener('didFocus', () => {
  //     StatusBar.setBarStyle("dark-content");
  //   });

  //   return () => { _navListener.remove() }
  // }, [])

  const [state, setstate] = useState([]);
  useEffect(() => {
    props.fetchAllRestaurant();
    props.getUserInfo(props.userId);
    props.getNotification(props.userId);
    props.navigation.setParams({ a: '12' });
  }, []);
  return (
    <ScrollView>
      {/* <StatusBar barStyle='dark-content' /> */}
      <MyCarousel />
      <CategoryWithIcon />
      <StoreList storeList={props.restaurantList} />
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

const mapStateToProps = state => {
  return {
    restaurantList: state.restaurantReducer.fullList,
    userId: state.authReducer.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchAllRestaurant,
      getUserInfo,
      getNotification,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
