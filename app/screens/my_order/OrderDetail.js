/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import { AirbnbRating, ListItem, Button, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { theme } from '../../constants/theme';
import { image } from '../../constants/images';
import { currencyFormat } from '../../helpers/string';
import {
  updateOrder,
  fetchOrderById,
  clearOrderInfo,
  reviewOrder,
} from '../../actions/orderActions';
import dateFormat from '../../helpers/date';
import { navigate } from '../../services/NavigationService';

export default function OrderDetail({ navigation }) {
  const { orderId } = navigation.state.params;
  const orderDetail = useSelector(state => state.orderReducer.orderDetail);
  const [review, setReview] = useState({ star: null, desc: '' });
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(reviewOrder(orderId, review));
    setReview({ star: null, desc: '' });
  };
  useEffect(() => {
    dispatch(fetchOrderById(orderId));
    return () => {
      dispatch(clearOrderInfo());
    };
  }, []);
  // const labels = [
  //   'Order placed',
  //   'Payment Confirmed',
  //   'Delivering',
  //   'Order Delivered',
  // ];
  // const customStyles = {
  //   stepIndicatorSize: 25,
  //   currentStepIndicatorSize: 25,
  //   separatorStrokeWidth: 2,
  //   currentStepStrokeWidth: 5,
  //   stepStrokeCurrentColor: '#ffa366',
  //   stepStrokeWidth: 3,
  //   stepStrokeFinishedColor: '#ffc08a',
  //   stepStrokeUnFinishedColor: '#aaaaaa',
  //   separatorFinishedColor: '#ffc08a',
  //   separatorUnFinishedColor: '#aaaaaa',
  //   stepIndicatorFinishedColor: '#ffc08a',
  //   stepIndicatorUnFinishedColor: '#ffffff',
  //   stepIndicatorCurrentColor: theme.color.primary,
  //   stepIndicatorLabelFontSize: 13,
  //   currentStepIndicatorLabelFontSize: 13,
  //   stepIndicatorLabelCurrentColor: theme.color.primary,
  //   stepIndicatorLabelFinishedColor: '#ffffff',
  //   stepIndicatorLabelUnFinishedColor: 'transparent',
  //   labelColor: '#777',
  //   labelSize: 17,
  //   labelFontFamily: theme.text.fonts['sfpt-bold'],
  //   labelAlign: 'flex-start',
  //   currentStepLabelColor: theme.color.primary,
  // };

  // const [currentPositionIndex, setcurrentPositionIndex] = useState(2);
  // const renderStepIndicator = params => (
  //   <Icon
  //     type="material-community"
  //     name="check"
  //     color={params.stepStatus === 'finished' ? '#fff' : 'transparent'}
  //     size={17}
  //   />
  // );
  // const renderLabel = ({ position, stepStatus, label, currentPosition }) => {
  //   return (
  //     <View style={styles.labelContainer}>
  //       <Image
  //         source={getImageLabel(position)}
  //         style={{
  //           height: 40,
  //           width: 40,
  //           opacity: position === currentPosition ? 1 : 0.4,
  //         }}
  //       />
  //       <Text
  //         style={[
  //           position === currentPosition
  //             ? styles.stepLabelSelected
  //             : styles.stepLabel,
  //           { paddingHorizontal: 8 },
  //         ]}
  //       >
  //         {label}
  //       </Text>
  //     </View>
  //   );
  // };
  console.log(review);
  return (
    <ScrollView style={styles.container}>
      {orderDetail && (
        <View>
          {/* <View style={{ height: 400, paddingHorizontal: 16 }}>
        <StepIndicator
          renderStepIndicator={renderStepIndicator}
          customStyles={customStyles}
          currentPosition={currentPositionIndex}
          labels={labels}
          direction="vertical"
          renderLabel={renderLabel}
          stepCount={4}
        />
      </View> */}
          <View
            style={{
              marginBottom: 16,
            }}
          >
            {orderDetail.restaurant && (
              <Text
                style={styles.restName}
                onPress={() =>
                  navigate('Store', {
                    restaurantId: orderDetail.restaurant._id,
                  })
                }
              >
                {orderDetail.restaurant.name}
              </Text>
            )}
            <Text style={styles.status}>{orderDetail.status}</Text>
            <Text
              style={{
                fontFamily: theme.text.fonts.sfpt,
                fontSize: theme.text.size.sm,
              }}
            >
              {dateFormat(+orderDetail.createdAt)}
            </Text>
          </View>
          <View>
            <FlatList
              data={orderDetail.items}
              keyExtractor={item => `${item._id}`}
              renderItem={({ item }) => (
                <ListItem
                  title={item.food.name}
                  rightElement={
                    <Text style={styles.foodPrice}>{`${
                      item.qty
                    } x ${currencyFormat(
                      item.food.price.value.toString()
                    )}đ`}</Text>
                  }
                  bottomDivider
                  containerStyle={{ paddingHorizontal: 0 }}
                />
              )}
            />
            <View>
              <ListItem
                title="total"
                titleStyle={styles.totalTitle}
                containerStyle={{ paddingHorizontal: 0 }}
                rightElement={
                  <Text style={styles.total}>{`${currencyFormat(
                    orderDetail.total.toString()
                  )}đ`}</Text>
                }
              />
            </View>
          </View>
          <Button
            title="Cancel order"
            disabled={orderDetail.status !== 'pending'}
            disabledTitleStyle={{ color: '#fff' }}
            onPress={() => {
              dispatch(updateOrder(orderDetail._id, 'cancelled'));
              navigation.goBack();
            }}
            type="clear"
            titleStyle={styles.btnTitle}
            containerStyle={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
            buttonStyle={{ padding: 0 }}
            activeOpacity={0.5}
            TouchableComponent={TouchableHighlight}
            underlayColor="#fff"
          />
          <View style={{ paddingTop: 30 }}>
            <View style={styles.shadow}>
              <View style={styles.contentContainer}>
                <Image
                  source={image.orderImg.address}
                  style={{ width: 30, height: 30 }}
                />
                <View style={styles.rightElement}>
                  <Text style={styles.title}>Delivery Address</Text>
                  <Text style={styles.subtitle}>
                    {orderDetail.delivery_position.address}
                  </Text>
                </View>
              </View>
            </View>
            {orderDetail.status === 'completed' && (
              <View style={styles.shadow}>
                <View style={styles.contentContainer}>
                  <Image
                    source={image.orderImg.star}
                    style={{ width: 30, height: 30 }}
                  />
                  <View style={styles.rightElement}>
                    <Text style={styles.title}>
                      {orderDetail.review.star
                        ? `Your review`
                        : `Don't forget to rate`}
                    </Text>
                    <View style={{ alignItems: 'flex-start', paddingTop: 8 }}>
                      <AirbnbRating
                        isDisabled={!!orderDetail.review.star}
                        size={20}
                        showRating={false}
                        defaultRating={
                          orderDetail.review.star ? orderDetail.review.star : 0
                        }
                        onFinishRating={value =>
                          setReview(prev => ({ ...prev, star: value }))
                        }
                      />
                      <Input
                        multiline
                        disabled={!!orderDetail.review.description}
                        containerStyle={{
                          borderColor: theme.color.gray,
                          borderWidth: 1,
                          marginTop: 8,
                        }}
                        defaultValue={
                          orderDetail.review.description
                            ? orderDetail.review.description
                            : ''
                        }
                        onChangeText={text =>
                          setReview(prev => ({ ...prev, desc: text }))
                        }
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                      />
                    </View>
                    <Button
                      activeOpacity={0.5}
                      TouchableComponent={TouchableHighlight}
                      underlayColor="#fff"
                      title="Confirm"
                      type="clear"
                      disabled={!review.star || !review.desc}
                      disabledTitleStyle={{ color: '#fff' }}
                      buttonStyle={{
                        padding: 0,
                        paddingTop: 8,
                      }}
                      onPress={() => handleSubmit()}
                      titleStyle={{
                        color: theme.color.primary,
                        fontFamily: theme.text.fonts.sfpt,
                        fontSize: theme.text.size.md,
                      }}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
      {!orderDetail && <ActivityIndicator size="large" />}
    </ScrollView>
  );
}

// const getImageLabel = position => {
//   switch (position) {
//     case 0:
//       return image.orderImg.order;
//     case 1:
//       return image.orderImg.payment;
//     case 2:
//       return image.orderImg.delivering;
//     case 3:
//       return image.orderImg.delivered;
//     default:
//       return null;
//   }
// };

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
  restName: {
    fontSize: theme.text.size.xl,
    fontFamily: theme.text.fonts['sfpd-bold'],
    paddingBottom: 8,
  },
  status: {
    fontSize: theme.text.size.md,
    fontFamily: theme.text.fonts.sfpt,
    textTransform: 'uppercase',
    color: theme.color.primary,
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
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
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
  totalTitle: {
    fontSize: theme.text.size.lg,
    fontFamily: theme.text.fonts['sfpd-medium'],
    textTransform: 'uppercase',
  },
  total: {
    fontSize: theme.text.size.lg,
    fontFamily: theme.text.fonts['sfpd-medium'],
  },
  btnTitle: {
    color: theme.color.red,
    fontSize: theme.text.size.md,
    fontFamily: theme.text.fonts['sfpt-medium'],
  },
});
