/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { ScrollView, RefreshControl, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import StoreList from '../components/StoreList';
import MyCarousel from '../components/Carousel';
import CategoryWithIcon from '../components/CategoryWithIcon';
import PopularList from '../components/PopularList';
import { theme } from '../constants/theme';
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
  useEffect(() => {
    // props.fetchAllRestaurant();
    props.getNotification(props.userId);
  }, []);

  const handleRefresh = () => {
    props.fetchAllRestaurant();
    props.getNotification(props.userId);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={props.isLoading}
          onRefresh={handleRefresh}
          size={30}
          colors={[theme.color.primary]}
        />
      }
    >
      {/* <StatusBar barStyle='dark-content' /> */}
      <MyCarousel data={props.restSortByTime} />
      <CategoryWithIcon />
      <StoreList data={props.restaurantList} />
      <PopularList data={props.restaurantList} />
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
            color={theme.color.primary}
          />
        }
        type="clear"
        onPress={() => navigation.navigate('Search')}
        activeOpacity={0.5}
        TouchableComponent={TouchableHighlight}
        underlayColor="#fff"
      />
    ),
  };
};

const mapStateToProps = state => {
  return {
    restaurantList: state.restaurantReducer.fullList,
    userId: state.auth.userId,
    userInfo: state.auth.userInfo,
    isLoading: state.uiReducer.isLoading,
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
