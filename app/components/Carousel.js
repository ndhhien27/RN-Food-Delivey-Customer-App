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

const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = () => {
  const [state, setstate] = useState([
    { thumbnail: 'http://via.placeholder.com/360x200', title: 'thumbnail 1' },
    { thumbnail: 'http://via.placeholder.com/360x200', title: 'thumbnail 2' },
    { thumbnail: 'http://via.placeholder.com/360x200', title: 'thumbnail 3' },
    { thumbnail: 'http://via.placeholder.com/360x200', title: 'thumbnail 4' },
  ]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.thumbnail }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goForward}>
        <Text>go to next slide</Text>
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={state}
        renderItem={renderItem}
        hasParallaxImages
      // slideStyle={{ marginLeft: -10, marginRight: 10 }}
      />
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: 200,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});
