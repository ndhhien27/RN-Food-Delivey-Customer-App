import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Button, Icon, Overlay } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import MapView, { Polyline, Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { theme } from '../../constants/theme';
import AuthChooseOnMap from './AuthChooseOnMap';

export default function SelectPositionModal(props) {
  const [lat, setLat] = useState(16.0216792);
  const [long, setLong] = useState(108.2257474);
  const [error, setError] = useState('');
  const { onPress, formikKey, formikProps, latKey, longKey } = props;
  const inputLocationRef = useRef();
  const [isVisible, setisVisible] = useState(false);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      error => setError(error.message),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }, []);

  const chooseLocation = (address, latSelected, longSelected) => {
    formikProps.setFieldValue(formikKey, address);
    formikProps.setFieldValue(latKey, latSelected);
    formikProps.setFieldValue(longKey, longSelected);
  };
  // const goToLocation = (latt, longg) => {
  //   mapRef.current.animateCamera(
  //     {
  //       center: {
  //         latitude: latt,
  //         longitude: longg,
  //       },
  //       pitch: 2,
  //       heading: 20,
  //       altitude: 200,
  //       zoom: 17,
  //     },
  //     1000
  //   );
  // };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: theme.color.gray,
          height: 60,
          width: '100%',
          paddingHorizontal: 16,
          backgroundColor: '#fff',
        }}
      >
        <Button
          type="clear"
          icon={<Icon type="material-community" name="close" />}
          buttonStyle={{ padding: 0 }}
          onPress={onPress}
        />
        <Text style={styles.title}>Choose location</Text>
        <Button
          type="clear"
          buttonStyle={{ padding: 0 }}
          icon={<Icon type="material-community" name="map-search-outline" />}
          onPress={() => setisVisible(true)}
        />
      </View>
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => setisVisible(false)}
        animationType="slide"
        height="80%"
        width="100%"
        overlayStyle={{ padding: 0, position: 'absolute', bottom: 0 }}
      >
        <AuthChooseOnMap
          hideModal={() => setisVisible(false)}
          hideParentModal={onPress}
          chooseLocation={chooseLocation}
        />
      </Overlay>
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          ref={inputLocationRef}
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType="search" // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          // keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed="false" // true/false/undefined
          fetchDetails
          renderRow={row => (
            <View>
              <Button
                disabled
                disabledTitleStyle={{ color: '#000' }}
                type="clear"
                buttonStyle={{ padding: 0 }}
                containerStyle={{ alignItems: 'flex-start' }}
                icon={
                  <Icon
                    type="material-community"
                    name="map-marker-outline"
                    size={16}
                  />
                }
                title={row.structured_formatting.main_text}
                titleStyle={{ color: '#000' }}
              />
              <Text style={{ paddingLeft: 16 }}>
                {row.structured_formatting.secondary_text}
              </Text>
            </View>
          )}
          // renderDescription={row => row.structured_formatting.main_text}
          onPress={(data, details = null) => {
            const { location } = details.geometry;
            formikProps.setFieldValue(formikKey, details.formatted_address);
            formikProps.setFieldValue(latKey, location.lat);
            formikProps.setFieldValue(longKey, location.lng);
            onPress();
            // MapAPI.geocoding(
            //   details.formatted_address,
            //   res => {
            //     const { lat, lng } = res.data.results[0].geometry.location;
            //     setChoosenGeometry({
            //       lat,
            //       long: lng,
            //     });
            //     // console.log(res.data.results[0].geometry.location);
            //   },
            //   err => console.log(err)
            // );
            // goToLocation(location.lat, location.lng);
            // console.log(location);
            // setLat(location.lat);
            // setLong(location.lng);
          }}
          getDefaultValue={() => ''}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyD8fv7iKhenaSeUhpzU2hbMmJ3ZaBhw4rI',
            language: 'vi', // language of the results
            components: 'country:vn',
            // types: '(cities)' // default: 'geocode'
          }}
          styles={{
            container: styles.mapContainer,
            listView: styles.listView,
            // description: styles.description,
            textInputContainer: styles.textInputContainer,
            poweredContainer: styles.poweredContainer,
            textInput: styles.textInput,
            predefinedPlacesDescription: styles.predefinedPlacesDescription,
            row: styles.row,
          }}
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={
            {
              // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }
          }
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            type: 'cafe',
          }}
          GooglePlacesDetailsQuery={{
            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
            fields: 'formatted_address',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          // predefinedPlaces={[homePlace, workPlace]}
          // renderRightButton={() => {
          //   const textRef = inputLocationRef.current;
          //   if (!textRef || textRef.getAddressText() !== '') {
          //     return (
          //       <View style={styles.btnContainer}>
          //         <Icon type="material" name="close" onPress={clearText} />
          //       </View>
          //     );
          //   }
          // }}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 22,
    height: 44,
    backgroundColor: theme.color.lightGray,
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: theme.text.size.md,
  },
  row: {
    height: Platform.OS === 'android' ? 60 : 40,
    padding: 4,
  },
  description: {
    fontFamily: theme.text.fonts['sfpt-bold'],
    fontSize: theme.text.size.md,
  },
  predefinedPlacesDescription: {
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: theme.text.size.md,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  mapContainer: {
    position: 'absolute',
    // right: 10,
    // left: 10,
    // padding: 10,
    backgroundColor: 'transparent',
    zIndex: 1000,
    width: '100%',
    alignSelf: 'center',
    // height: 30
  },
  listView: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 16,
  },
  textInputContainer: {
    backgroundColor: 'transparent',
    // marginTop: 44,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 70,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    // paddingVertical: 20,
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
    width: 50,
    height: 50,
    zIndex: 10000,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.white,
    borderColor: theme.color.primary,
    borderWidth: 3,
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
  title: {
    fontFamily: theme.text.fonts.sfpd,
    fontSize: theme.text.size.lg,
  },
});
