import React from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';

import StarInfo from '../commons/store/StarInfo';
import { theme } from '../constants/theme';

function Banner(props) {
  const { storeName } = props;
  return (
    <View>
      <ImageBackground
        source={{ uri: 'http://via.placeholder.com/350x350' }}
        style={styles.imgStyle}
      >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.17)', flex: 1 }}>
          <View style={styles.contentContainer}>
            <View style={styles.promotionStyle}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Promotion</Text>
            </View>
            <Text style={styles.storeName}>{storeName}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon type="material-community" name="map-marker" color="#fff" />
              <Text style={styles.addressLine}>
                382 Ton Duc Thang, Lien Chieu, Da Nang
              </Text>
            </View>
          </View>
          <View style={styles.moreInfo}>
            <StarInfo />
            <StarInfo />
            <StarInfo style={{ borderRightWidth: 0 }} />
          </View>
        </View>
      </ImageBackground>
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
    borderRadius: 9,
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
});

export default Banner;
