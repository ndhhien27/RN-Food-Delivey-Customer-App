/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import StarInfo from '../commons/store/StarInfo';
import { theme } from '../constants/theme';
import { navigate } from '../services/NavigationService';
import Decimal from '../helpers/decimal';

const { width, height } = Dimensions.get('window');

function Banner(props) {
  const { storeName, position, restaurantInfo, img } = props;
  return (
    <View>
      <ImageBackground source={{ uri: img }} style={styles.imgStyle}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          locations={[0, 0.4, 1]}
          colors={['#000', 'transparent', 'transparent']}
          style={{ flex: 1 }}
        >
          <View style={{ backgroundColor: 'rgba(0,0,0,0.17)', flex: 1 }}>
            <View style={styles.contentContainer}>
              <View style={styles.promotionStyle}>
                <Text style={{ color: '#fff', fontSize: 15 }}>Free ship</Text>
              </View>
              <Text style={styles.storeName}>{storeName}</Text>
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() =>
                  navigate('StoreMap', {
                    storeLat: position.lat,
                    storeLong: position.long,
                    address: position.address,
                    storeName,
                  })
                }
              >
                <Icon
                  type="material-community"
                  name="map-marker"
                  color="#fff"
                />
                <Text style={styles.addressLine}>{position.address}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.moreInfo}>
              <StarInfo
                name="star"
                label="Rating"
                value={
                  restaurantInfo.rating
                    ? Decimal.round10(restaurantInfo.rating.avg, -1)
                    : 0
                }
                disabled
              />
              <StarInfo
                name="bookmark"
                label="Bookmarks"
                value={restaurantInfo.bookmarks}
                disabled
              />
              <StarInfo
                name="message-draw"
                label="Reviews"
                style={{ borderRightWidth: 0 }}
                value={
                  restaurantInfo.rating ? restaurantInfo.rating.total_review : 0
                }
                onPress={() => navigate('Review', null)}
              />
            </View>
          </View>
        </LinearGradient>
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
    width: '100%',
  },
  imgStyle: {
    width: '100%',
    height: height * (3 / 7),
    resizeMode: 'cover',
  },
  title: {
    fontFamily: theme.text.fonts['sfpd-medium'],
    fontSize: theme.text.size.lg,
    paddingLeft: 16,
  },
});

export default Banner;
