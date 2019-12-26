/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { image } from '../constants/images';
import { theme } from '../constants/theme';
import SliderEntry from './SliderEntry';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import OtherStyles from './index';
import { navigate } from '../services/NavigationService';

const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = props => {
  const restList = useSelector(state => state.restaurantReducer.fullList);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const _renderItem = ({ item, index }) => {
    return (
      <SliderEntry
        onPress={() => navigate('Store', { restaurantId: item._id })}
        data={item}
        even={(index + 1) % 2 === 0}
      />
    );
  };

  const momentumExample = () => {
    return (
      <View style={styles.exampleContainer}>
        <Carousel
          firstItem={1}
          data={[...restList]
            .sort((rest1, rest2) => rest1.createdAt - rest2.createdAt)
            .reverse()
            .slice(0, 5)}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          // enableMomentum
          // activeSlideAlignment="start"
          containerCustomStyle={OtherStyles.slider}
          contentContainerCustomStyle={OtherStyles.sliderContentContainer}
          activeAnimationType="spring"
          // activeAnimationOptions={{
          //   friction: 4,
          //   tension: 40,
          // }}
        />
      </View>
    );
  };

  return <View style={styles.container}>{momentumExample()}</View>;
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    paddingRight: 16,
    height: 200,
    marginRight: 8,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  title: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: 17,
    color: '#fff',
  },
  subtitle: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: 17,
  },
});
