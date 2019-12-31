/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { ListItem, Button, Overlay, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../../constants/theme';
import OrderModal from './OrderModal';
import { createOrder } from '../../actions/orderActions';
import ChooseAddress from './ChooseAddress';

export default function CheckoutScreen({ navigation }) {
  const { localCartIndex } = navigation.state.params;
  const [isVisible, setIsVisible] = useState(false);
  const [isPositionModal, setIsPositionModal] = useState(false);
  const globalCart = useSelector(state => state.cart.cart);
  const userId = useSelector(state => state.auth.userId);
  const userInfo = useSelector(state => state.auth.userInfo);
  const dispatch = useDispatch();
  const [otherAddress, setOtherAddress] = useState({
    _id: 'otherAddress-001',
    address: null,
    lat: null,
    long: null,
    isSelect: false,
  });
  const [paymentInfo, setpaymentInfo] = useState({
    deliveryAddress: {
      address: null,
      lat: null,
      long: null,
    },
    paymentType: null,
    paymentInfo: null,
  });
  const [state, setstate] = useState({
    location: userInfo.position.map(el => {
      return {
        ...el,
        isSelect: false,
      };
    }),
    payment_method: userInfo.payment.map(el => {
      return {
        ...el,
        isSelect: false,
      };
    }),
  });

  const selectAddress = item => {
    // eslint-disable-next-line no-param-reassign
    // item.isSelect = !item.isSelect;
    setstate(prev => {
      return {
        ...prev,
        location: prev.location.map(el =>
          el._id !== item._id
            ? { ...el, isSelect: false }
            : { ...el, isSelect: true }
        ),
      };
    });
    setpaymentInfo(prev => {
      return {
        ...prev,
        deliveryAddress: {
          address: item.address,
          lat: item.lat,
          long: item.long,
        },
      };
    });
  };

  console.log(paymentInfo);

  const selectPayment = item => {
    // eslint-disable-next-line no-param-reassign
    setstate(prev => {
      return {
        ...prev,
        payment_method: prev.payment_method.map(el =>
          el._id !== item._id
            ? { ...el, isSelect: false }
            : { ...el, isSelect: true }
        ),
      };
    });
    setpaymentInfo(prev => {
      return {
        ...prev,
        paymentType: item.paymentType,
        paymentInfo: item.detail,
      };
    });
  };

  const renderListAdress = ({ item, index }) => (
    <ListItem
      title={`Address ${index + 1}`}
      titleStyle={styles.listItemTitle}
      contentContainerStyle={{
        marginHorizontal: -5,
      }}
      subtitle={item.address}
      subtitleProps={{ numberOfLines: 1 }}
      subtitleStyle={{
        fontFamily: theme.text.fonts.sfpt,
      }}
      onPress={() => selectAddress(item)}
      containerStyle={[
        styles.listContainer,
        {
          borderWidth: item.isSelect ? 1 : 0,
        },
      ]}
      checkmark={{
        color: theme.color.primary,
        type: 'material-community',
        name: 'check-circle',
        opacity: item.isSelect ? 1 : 0,
        size: 26,
      }}
      Component={TouchableOpacity}
      activeOpacity={0.5}
    />
  );

  const renderListPayment = ({ item }) => (
    <ListItem
      title={item.paymentType}
      titleStyle={styles.listItemTitle}
      contentContainerStyle={{
        marginHorizontal: -5,
      }}
      subtitle={item.detail}
      subtitleProps={{ numberOfLines: 1 }}
      subtitleStyle={{
        fontFamily: theme.text.fonts.sfpt,
      }}
      onPress={() => selectPayment(item)}
      containerStyle={[
        styles.listContainer,
        {
          borderWidth: item.isSelect ? 1 : 0,
        },
      ]}
      checkmark={{
        type: 'material-community',
        name: 'check-circle',
        color: theme.color.primary,
        opacity: item.isSelect ? 1 : 0,
        size: 26,
      }}
      Component={TouchableOpacity}
      activeOpacity={0.5}
    />
  );

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const addAddress = address => {
    setOtherAddress(prev => {
      return {
        ...prev,
        address: address.address,
        lat: address.lat,
        long: address.long,
      };
    });
  };

  const payment = () => {
    if (paymentInfo.deliveryAddress.address && paymentInfo.paymentInfo) {
      toggleModal();
      dispatch(
        createOrder({
          userId,
          ...paymentInfo,
          ...globalCart[localCartIndex],
        })
      );
    } else {
      alert('Please choose payment info');
    }
  };

  useEffect(() => {
    if (otherAddress.address) {
      const index = state.location.findIndex(el => el._id === otherAddress._id);
      if (index !== -1)
        setstate(prev => {
          return {
            ...prev,
            location: prev.location.map(el =>
              el._id === otherAddress._id ? { ...otherAddress } : { ...el }
            ),
          };
        });
      else
        setstate(prev => {
          return {
            ...prev,
            location: [...prev.location, { ...otherAddress }],
          };
        });
    }
  }, [otherAddress.address]);

  return (
    <View
      style={{
        backgroundColor: theme.color.lightGray,
        flex: 1,
        paddingVertical: 16,
      }}
    >
      <View style={styles.shadow}>
        <Overlay
          isVisible={isVisible}
          animationType="slide"
          onBackdropPress={() => toggleModal()}
          overlayStyle={{ borderRadius: 24 }}
          height={475}
        >
          <OrderModal hideModal={toggleModal} />
        </Overlay>
        <Overlay
          isVisible={isPositionModal}
          onBackdropPress={() => setIsPositionModal(false)}
          animationType="slide"
          height="80%"
          width="100%"
          overlayStyle={{ padding: 0, position: 'absolute', bottom: 0 }}
        >
          <ChooseAddress
            onPress={() => setIsVisible(false)}
            addAddress={addAddress}
            hideModal={() => setIsPositionModal(false)}
            // formikProps={formikProps}
            // formikKey="position.address"
            // latKey="position.lat"
            // longKey="position.long"
          />
        </Overlay>

        <View style={styles.contentContainer}>
          <View style={{ flex: 1 }}>
            <View style={{ maxHeight: 220 }}>
              <Text style={styles.title}>delivery address</Text>
              <FlatList
                data={state.location}
                renderItem={renderListAdress}
                keyExtractor={item => `address-${item._id}`}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
              />
              <Button
                activeOpacity={0.5}
                TouchableComponent={TouchableHighlight}
                underlayColor="#fff"
                title="Choose other address"
                type="clear"
                onPress={() => setIsPositionModal(true)}
                titleStyle={{ color: theme.color.primary }}
                containerStyle={{ alignItems: 'flex-start' }}
              />
            </View>
            <View style={{ maxHeight: 220, marginTop: 30 }}>
              <Text style={styles.title}>payment method</Text>
              <FlatList
                data={state.payment_method}
                renderItem={renderListPayment}
                keyExtractor={item => `pay-${item._id}`}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
          <Button
            activeOpacity={0.5}
            TouchableComponent={TouchableHighlight}
            underlayColor="#fff"
            title="Payment"
            titleStyle={{ fontFamily: theme.text.fonts.sfpt, fontSize: 22 }}
            buttonStyle={{
              backgroundColor: theme.color.primary,
              borderRadius: 8,
              // marginTop: 50,
            }}
            onPress={() => payment()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: theme.shadow,
  contentContainer: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    height: '100%',
    elevation: 10,
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: 16,
    marginBottom: 16,
  },
  listItemTitle: {
    textTransform: 'uppercase',
    color: theme.color.primary,
    marginBottom: 4,
    fontFamily: theme.text.fonts['sfpt-medium'],
    fontSize: 14,
  },
  listContainer: {
    borderColor: theme.color.primary,
    borderRadius: 4,
    backgroundColor: theme.color.lightGray,
    marginBottom: 10,
  },
});

CheckoutScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: (
      <Button
        activeOpacity={0.5}
        TouchableComponent={TouchableHighlight}
        underlayColor="#fff"
        icon={
          <Icon
            type="material-community"
            name="arrow-left"
            color={theme.color.primary}
            size={28}
          />
        }
        onPress={() => navigation.goBack()}
        type="clear"
      />
    ),
  };
};
