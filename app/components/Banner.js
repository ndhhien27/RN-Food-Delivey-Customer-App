import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Icon } from 'react-native-elements';
import StarInfo from '../commons/store/StarInfo';
import FeaturedItem from './FeaturedItem';
import { theme } from '../constants/theme';

function Banner(props) {
  const { storeName, address, foods } = props;
  console.log(storeName);
  return (
    <View>
      <ImageBackground
        source={{ uri: 'http://via.placeholder.com/350x350' }}
        style={styles.imgStyle}
      >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.17)', flex: 1 }}>
          <View style={styles.contentContainer}>
            <View style={styles.promotionStyle}>
              <Text style={{ color: '#fff', fontSize: 15 }}>Promotion</Text>
            </View>
            <Text style={styles.storeName}>{storeName}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon type="material-community" name="map-marker" color="#fff" />
              <Text style={styles.addressLine}>{address}</Text>
            </View>
          </View>
          <View style={styles.moreInfo}>
            <StarInfo />
            <StarInfo />
            <StarInfo style={{ borderRightWidth: 0 }} />
          </View>
        </View>
      </ImageBackground>
      {/* <View style={{ paddingVertical: 20 }}>
        <Text style={styles.title}>Featured Items</Text>
        <FlatList
          data={foods.foods}
          keyExtractor={item => `feature-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <FeaturedItem item={item} />}
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 18,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  promotionStyle: {
    backgroundColor: theme.color.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 11,
    height: 22,
  },
  storeName: {
    color: '#fff',
    fontSize: 30,
    paddingVertical: 4,
  },
  addressLine: {
    color: '#fff',
    fontSize: 16,
  },
  moreInfo: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#fff',
  },
  imgStyle: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  title: {
    fontFamily: theme.text.fonts['sfpd-medium'],
    fontSize: theme.text.size.lg,
    paddingLeft: 16,
  },
});

export default Banner;
