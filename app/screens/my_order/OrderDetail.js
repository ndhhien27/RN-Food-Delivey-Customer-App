/* eslint-disable react/jsx-props-no-spreading */
import StepIndicator from 'react-native-step-indicator';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Icon, Rating, AirbnbRating } from 'react-native-elements';
import { theme } from '../../constants/theme';
import { image } from '../../constants/images';

export default function OrderDetail({ navigation }) {
  const { deliveryAddress } = navigation.state.params;
  const labels = [
    'Order placed',
    'Payment Confirmed',
    'Delivering',
    'Order Delivered',
  ];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#ffa366',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#ffc08a',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#ffc08a',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#ffc08a',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: theme.color.primary,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: theme.color.primary,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#777',
    labelSize: 17,
    labelFontFamily: theme.text.fonts['sfpt-bold'],
    labelAlign: 'flex-start',
    currentStepLabelColor: theme.color.primary,
  };

  const [currentPositionIndex, setcurrentPositionIndex] = useState(2);
  const renderStepIndicator = params => (
    <Icon
      type="material-community"
      name="check"
      color={params.stepStatus === 'finished' ? '#fff' : 'transparent'}
      size={17}
    />
  );
  const renderLabel = ({ position, stepStatus, label, currentPosition }) => {
    return (
      <View style={styles.labelContainer}>
        <Image
          source={getImageLabel(position)}
          style={{
            height: 40,
            width: 40,
            opacity: position === currentPosition ? 1 : 0.4,
          }}
        />
        <Text
          style={[
            position === currentPosition
              ? styles.stepLabelSelected
              : styles.stepLabel,
            { paddingHorizontal: 8 },
          ]}
        >
          {label}
        </Text>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{ height: 400, paddingHorizontal: 16 }}>
        <StepIndicator
          renderStepIndicator={renderStepIndicator}
          customStyles={customStyles}
          currentPosition={currentPositionIndex}
          labels={labels}
          direction="vertical"
          renderLabel={renderLabel}
          stepCount={4}
        />
      </View>
      <View style={styles.shadow}>
        <View style={styles.contentContainer}>
          <Image
            source={image.orderImg.address}
            style={{ width: 30, height: 30 }}
          />
          <View style={styles.rightElement}>
            <Text style={styles.title}>Delivery Address</Text>
            <Text style={styles.subtitle}>{deliveryAddress}</Text>
          </View>
        </View>
      </View>
      <View style={styles.shadow}>
        <View style={styles.contentContainer}>
          <Image
            source={image.orderImg.star}
            style={{ width: 30, height: 30 }}
          />
          <View style={styles.rightElement}>
            <Text style={styles.title}>Don't forget to rate</Text>
            <View style={{ alignItems: 'flex-start', paddingTop: 8 }}>
              <AirbnbRating size={20} showRating={false} defaultRating={0} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const getImageLabel = position => {
  switch (position) {
    case 0:
      return image.orderImg.order;
    case 1:
      return image.orderImg.payment;
    case 2:
      return image.orderImg.delivering;
    case 3:
      return image.orderImg.delivered;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  shadow: {
    ...theme.shadow,
    marginBottom: 16,
  },
  rightElement: {
    flexDirection: 'column',
    paddingLeft: 8,
    flex: 1,
  },
  stepLabel: {
    fontSize: 17,
    fontFamily: theme.text.fonts['sfpt-bold'],
    textAlign: 'center',
    color: '#777',
  },
  stepLabelSelected: {
    fontSize: theme.text.size.lg,
    textAlign: 'center',
    fontFamily: theme.text.fonts['sfpd-bold'],
    color: theme.color.primary,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  contentContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: theme.text.size.lg,
    fontFamily: theme.text.fonts['sfpd-medium'],
  },
  subtitle: {
    fontSize: theme.text.size.md,
    fontFamily: theme.text.fonts.sfpt,
    color: theme.color.darkGray,
    paddingTop: 8,
  },
});
