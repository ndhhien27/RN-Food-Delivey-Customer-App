/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {
  Polyline,
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Circle,
} from 'react-native-maps';
import { decode } from '@mapbox/polyline';
import {
  Icon,
  Button,
  Divider,
  Rating,
  AirbnbRating,
  Tooltip,
} from 'react-native-elements';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Carousel from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../constants/theme';
import MapAPI from '../services/MapService';
import MapStyle from '../components/MapStyle';
import { navigate } from '../services/NavigationService';
import { image } from '../constants/images';
import Decimal from '../helpers/decimal';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInput: {
    padding: 0,
    height: 44,
    margin: 0,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    position: 'absolute',
    // right: 10,
    // left: 10,
    paddingTop: 44,
    padding: 10,
    backgroundColor: 'transparent',
    zIndex: 1000,
    width: '100%',
    // height: 30
  },
  listView: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    // height: 56,
    // // width: '80%',
    // marginTop: 44,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    // alignItems: 'center'
  },
  poweredContainer: {
    display: 'none',
  },
  rightBtn: {},
  btnContainer: {
    justifyContent: 'center',
    padding: 10,
    zIndex: 10000000,
  },
  myLocation: {
    zIndex: 10000,
    position: 'absolute',
    bottom: 200,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeRadius: {
    backgroundColor: 'transparent',
    zIndex: 100000,
    position: 'absolute',
    top: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  direction: {
    zIndex: 1000000,
    position: 'absolute',
    bottom: 260,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseBtn: {
    width: '50%',
    alignSelf: 'center',
    top: '91.5%',
    zIndex: 1000000,
  },
  slide: {
    height: 200,
  },
  directionInfoContainer: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#fff',
    bottom: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 16,
  },
  directionInfoText: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: theme.text.size.md,
  },
  restName: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: 17,
    color: '#fff',
  },
});

const filterRestByDistance = createSelector(
  state => state.restaurantReducer.fullList,
  (_, radius) => radius,
  (fullList, radius) => fullList.filter(rest => rest.distance <= radius)
);

const MapNearest = props => {
  const { navigation } = props;
  const [radius, setRadius] = useState(0.5);
  const restByDistance = useSelector(state =>
    filterRestByDistance(state, radius)
  );
  const currentLocation = useSelector(state => state.auth.currentLocation);
  // const { storeLat, storeLong, storeName } = navigation.state.params;
  const [error, setError] = useState('');
  const mapRef = useRef();
  const [directionData, setDirectionData] = useState({
    targetLat:
      restByDistance.length > 0
        ? restByDistance[0].position.lat
        : currentLocation.lat,
    targetLong:
      restByDistance.length > 0
        ? restByDistance[0].position.long
        : currentLocation.long,
    coords: null,
    distance: null,
    time: null,
    isDirection: false,
    restInfo: {
      name: null,
      address: null,
      img: null,
      restId: null,
      star: null,
    },
    isShowInfo: false,
  });

  useEffect(() => {
    if (restByDistance.length === 0)
      setDirectionData(prev => {
        return {
          ...prev,
          targetLat: currentLocation.lat,
          targetLong: currentLocation.long,
          isDirection: false,
          restInfo: {
            name: null,
            address: null,
            img: null,
            restId: null,
            star: null,
          },
          isShowInfo: false,
        };
      });
    else if (restByDistance.length > 0)
      setDirectionData(prev => {
        return {
          ...prev,
          targetLat: restByDistance[0].position.lat,
          targetLong: restByDistance[0].position.long,
        };
      });
  }, [restByDistance]);

  const changeRadius = radius => {
    switch (radius) {
      case 0.5:
        return 1;
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 0.5;
    }
  };

  // const { formikProps, formikKey, latKey, longKey } = navigation.state.params;

  useEffect(() => {
    direction();
  }, [directionData.targetLat, directionData.targetLong]);

  const direction = () => {
    const originStr = `${currentLocation.lat},${currentLocation.long}`;
    const destStr = `${directionData.targetLat},${directionData.targetLong}`;
    MapAPI.directions(
      originStr,
      destStr,
      res => {
        // console.log(res.data.routes[0]);
        const routes = res.data.routes[0];
        const points = decode(routes.overview_polyline.points);
        const coords = points.map(point => {
          return {
            latitude: point[0],
            longitude: point[1],
          };
        });
        const distanceTime = routes.legs[0];
        const distance = distanceTime.distance.text;
        const time = distanceTime.duration.text;
        setDirectionData(prev => {
          return {
            ...prev,
            coords,
            distance,
            time,
          };
        });
      },
      err => console.log(err)
    );
  };
  const goBackMyLocation = () => {
    mapRef.current.animateCamera(
      {
        center: {
          latitude: currentLocation.lat,
          longitude: currentLocation.long,
        },
        pitch: 2,
        heading: 20,
        altitude: 200,
        zoom: 17,
      },
      1000
    );
  };

  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    );
  };
  const [showCarousel, setShowCarousel] = useState(false);

  const onMarkerPress = rest => () => {
    const {
      position: { lat, long, address },
    } = rest;
    setDirectionData(prev => {
      return {
        ...prev,
        targetLat: lat,
        targetLong: long,
        restInfo: {
          restId: rest._id,
          name: rest.name,
          address,
          img: rest.img_url,
          star: Decimal.round10(rest.rating.avg, -1),
        },
        isShowInfo: true,
      };
    });
  };

  const renderMarkers = () => {
    return (
      <View>
        {restByDistance.map(rest => {
          const { lat, long } = rest.position;
          return (
            <Marker
              image={image.location}
              key={rest._id}
              coordinate={{ latitude: lat, longitude: long }}
              title={rest.name}
              onPress={onMarkerPress(rest)}
            />
          );
        })}
      </View>
    );
  };
  console.log(directionData);

  return (
    <>
      <MapView
        ref={mapRef}
        // onTouchStart={() => {
        //   inputLocationRef.current.triggerBlur();
        // }}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.lat,
          longitude: currentLocation.long,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        region={{
          latitude: directionData.targetLat,
          longitude: directionData.targetLong,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        customMapStyle={MapStyle}
        showsMyLocationButton
        showsUserLocation
        provider={PROVIDER_GOOGLE}
      >
        {renderMarkers()}
        {directionData.isDirection && (
          <Polyline
            strokeWidth={5}
            strokeColor="#3490de"
            coordinates={directionData.coords}
          />
        )}
        <Circle
          center={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
          }}
          fillColor="rgba(240,123,63,0.2)"
          strokeColor="rgba(240,123,63,0.5)"
          strokeWidth={2}
          radius={radius * 1000}
        />
      </MapView>
      <Button
        activeOpacity={0.9}
        TouchableComponent={TouchableHighlight}
        underlayColor="transparent"
        buttonStyle={{
          backgroundColor: '#fff',
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
        containerStyle={[
          styles.direction,
          directionData.isShowInfo ? {} : { bottom: 80 },
        ]}
        type="clear"
        icon={
          <Icon
            type="material-community"
            name="directions"
            size={30}
            color={theme.color.primary}
            underlayColor="transparent"
          />
        }
        onPress={() =>
          setDirectionData(prev => {
            return {
              ...prev,
              isDirection: true,
            };
          })
        }
      />
      {/* <View style={styles.myLocation}> */}
      <Button
        activeOpacity={0.9}
        TouchableComponent={TouchableHighlight}
        underlayColor="transparent"
        type="clear"
        title={`${radius} km`}
        titleStyle={{ color: theme.color.primary }}
        buttonStyle={{
          backgroundColor: '#fff',
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
        onPress={() => setRadius(changeRadius(radius))}
        containerStyle={[styles.changeRadius]}
      />
      <Button
        activeOpacity={0.5}
        TouchableComponent={TouchableHighlight}
        underlayColor="transparent"
        type="clear"
        icon={
          <Icon
            type="material-community"
            name="crosshairs-gps"
            size={30}
            color={theme.color.primary}
            onPress={goBackMyLocation}
            underlayColor="transparent"
          />
        }
        buttonStyle={{
          backgroundColor: '#fff',
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
        containerStyle={[
          styles.myLocation,
          directionData.isShowInfo ? {} : { bottom: 20 },
        ]}
        // containerStyle={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
      />
      {/* </View> */}
      {directionData.isShowInfo && (
        <View
          style={{
            position: 'absolute',
            width: (width * 5) / 6,
            height: 180,
            zIndex: 1000,
            alignSelf: 'center',
            bottom: 10,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigate('Store', { restaurantId: directionData.restInfo.restId })
            }
            activeOpacity={0.5}
          >
            <Image
              source={{ uri: directionData.restInfo.img }}
              style={{
                height: 180,
                borderRadius: 10,
              }}
              imageStyle={{ borderRadius: 10 }}
              resizeMode="cover"
            />
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              locations={[0, 0.3, 1]}
              colors={['#000', 'rgba(0,0,0,0.4)', 'transparent']}
              style={{
                justifyContent: 'flex-end',
                position: 'absolute',
                zIndex: 10000,
                height: '100%',
                width: '100%',
                paddingHorizontal: 8,
                paddingBottom: 8,
                borderRadius: 10,
              }}
            >
              <View>
                <Text style={styles.restName}>
                  {directionData.restInfo.name}
                </Text>
                <Text style={styles.restName}>
                  {directionData.restInfo.address}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon
                    type="material-community"
                    name="star"
                    iconStyle={{ color: 'yellow' }}
                  />
                  <Text
                    style={{
                      fontFamily: theme.text.fonts.sfpt,
                      fontSize: theme.text.size.lg,
                      color: 'yellow',
                    }}
                  >
                    {directionData.restInfo.star}
                  </Text>
                </View>
              </View>
              <Divider
                backgroundColor="#fff"
                style={{ marginVertical: 4, height: 1 }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.restName}>
                  Distance: {directionData.distance}
                </Text>
                <Text style={styles.restName}>Time: {directionData.time}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default MapNearest;
