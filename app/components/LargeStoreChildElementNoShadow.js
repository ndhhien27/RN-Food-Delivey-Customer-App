/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button, Icon } from 'react-native-elements';
import { theme } from '../constants/theme';
import Decimal from '../helpers/decimal';

function LargeStoreChildElementNoShadow(props) {
  const { item, navigation, type } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Restaurant', { restaurantId: item._id })
      }
      activeOpacity={0.5}
    >
      <Image source={{ uri: item.img_url }} style={styles.img} />
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.position.address}</Text>
        <View style={styles.otherDetailContainer}>
          <Button
            type="clear"
            icon={
              <Icon
                type="material-community"
                name="star"
                color={theme.color.primary}
                size={15}
              />
            }
            title={`${Decimal.round10(item.rating.avg, -1)}`}
            disabledTitleStyle={{
              color: theme.color.primary,
              fontFamily: theme.text.fonts.sfpt,
              fontSize: 17,
            }}
            disabled
            disabledStyle={{
              borderRadius: 8,
              padding: 0,
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Icon
              type="material-community"
              name="map-marker-radius"
              size={17}
              iconStyle={{ color: theme.color.darkGray }}
            />
            <Text style={styles.distance}>
              {`${Decimal.round10(item.distance, -1)} km`}
            </Text>
          </View>
          <Button
            title="Free ship"
            titleStyle={{ fontFamily: theme.text.fonts.sfpt, fontSize: 13 }}
            buttonStyle={{
              backgroundColor: theme.color.primary,
              paddingVertical: 0,
              paddingHorizontal: 10,
              height: 18,
              borderRadius: 9,
            }}
            activeOpacity={1}
            TouchableComponent={TouchableHighlight}
            underlayColor="#fff"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  img: {
    width: 88,
    height: 88,
    borderRadius: theme.radius.xs,
  },
  detailContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  otherDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.text.size.md,
    fontFamily: theme.text.fonts['sfpt-medium'],
  },
  subtitle: {
    fontSize: theme.text.size.sm,
    fontFamily: theme.text.fonts.sfpt,
    color: theme.color.darkGray,
    paddingVertical: theme.space['2xs'],
  },
  distance: {
    fontSize: theme.text.size.sm,
    fontFamily: theme.text.fonts.sfpt,
    color: theme.color.darkGray,
  },
});

export default withNavigation(LargeStoreChildElementNoShadow);
