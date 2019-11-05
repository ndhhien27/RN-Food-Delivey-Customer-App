import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';
import Temp from './Temp';

export default function AddAddressScreen() {
  // const fetchData

  const [city, setCity] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  // const [isVisible2, setIsVisible2] = useState(false);

  const selectCity = item => {
    setCity(item);
    setIsVisible(false);
  };
  return (
    <View>
      <View>
        <Text>City</Text>
        <Overlay isVisible={isVisible} fullScreen animationType="slide">
          <Temp
            onClose={() => setIsVisible(false)}
            url="https://thongtindoanhnghiep.co/api/city"
            onSelect={selectCity}
          />
        </Overlay>
        <View style={styles.selectContainer}>
          <Text onPress={() => setIsVisible(true)} d>
            {!city ? 'Choose one' : city}
          </Text>
        </View>
      </View>
      {/* <View>
        <Text>City</Text>
        <Overlay
          isVisible={isVisible2}
          fullScreen={true}
          animationType='slide'
        >
          <Temp
            onPress={() => setIsVisible2(false)}
            url='zxc'
            data={cityList2}
            onSelect={selectCity}
          />
        </Overlay>
        <View style={styles.selectContainer}>
          <Text
            onPress={() => setIsVisible2(true)}
            d
          >{!city ? 'Choose one' : city}</Text>
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  selectContainer: {
    borderColor: '#999',
    borderWidth: 1,
  },
});
