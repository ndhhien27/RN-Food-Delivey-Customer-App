/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Animated, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import MenuItem from '../components/MenuItem';
import Banner from '../components/Banner';
import Header from '../components/Header';
import { theme } from '../constants/theme';
import { CartContext } from '../context/CartContext';
import API from '../services/RestaurantService';
import { fetchRestaurantById } from '../actions/index';
import { modifyCart } from '../actions/cartActions';
import StoreLoading from '../components/StoreLoading';

function StoreScreen(props) {
  const { navigation } = props;
  const { restaurantId, storeName } = navigation.state.params;
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [childCart, setChildCart] = useState({
    restaurantId,
    items: [],
    subtotal: 0,
    total: 0,
  });
  const restaurantInfo = useSelector(
    state => state.restaurantReducer.restaurantInfo
  );
  const isLoading = useSelector(state => state.uiReducer.isLoading);
  const globalCart = useSelector(state => state.cartReducer.cart);
  const localCartIndex = useSelector(state =>
    selectCartIndex(state, restaurantId)
  );
  const dispatch = useDispatch();
  const fetchRestaurantInfo = () => dispatch(fetchRestaurantById(restaurantId));
  const modifyCurrentCart = () => dispatch(modifyCart(childCart));
  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    fetchRestaurantInfo();
    console.log('callAPI');
    if (localCartIndex >= 0) setChildCart(globalCart[localCartIndex]);
  }, []);
  useEffect(() => {
    modifyCurrentCart();
  }, [childCart]);

  // console.log('store', _.isEmpty(restaurantInfo));

  const increase = item => {
    setChildCart(prev => {
      const newItems = prev.items.map(el =>
        el.foodId !== item.foodId
          ? { ...el }
          : { ...el, foodQty: item.foodQty + 1 }
      );
      return {
        ...prev,
        items: newItems,
        subtotal: prev.subtotal + item.foodPrice,
        total: prev.total + item.foodPrice,
      };
    });
  };

  const decrease = item => {
    setChildCart(prev => {
      const newItems = prev.items.map(el =>
        el.foodId !== item.foodId
          ? { ...el }
          : { ...el, foodQty: item.foodQty - 1 }
      );
      const index = newItems.findIndex(el => el.foodQty === 0);
      if (index !== -1) {
        newItems.splice(index, 1);
        // console.log(test[0]);
      }
      return {
        ...prev,
        items: newItems,
        subtotal: prev.subtotal - item.foodPrice,
        total: prev.total - item.foodPrice,
      };
    });
  };

  const handleItem = item => {
    // item.is_active = !item.is_active;
    // setRestaurantDetail(prev => {
    //   return {
    //     ...prev,
    //     menu_info: prev.menu_info.map(el =>
    //       el._id !== item._id ? { ...el, is_active: false } : { ...item }
    //     ),
    //   };
    // });
    setChildCart(prevCart => {
      let afterCart = {};
      if (!prevCart.items.find(el => el.foodId === item._id)) {
        afterCart = {
          ...prevCart,
          restaurantId,
          items: [
            ...prevCart.items,
            {
              foodId: item._id,
              foodName: item.name,
              foodPrice: item.price.value,
              foodQty: 1,
            },
          ],
          subtotal: prevCart.subtotal + item.price.value,
          total: prevCart.total + item.price.value,
        };
      } else {
        // const index = prevCart.items.findIndex(el => el.foodId === item._id);
        // const newCartItem = prevCart.items.map(el => {
        //   return {
        //     ...el,
        //   };
        // });
        // if (index !== -1) newCartItem.splice(index, 1);
        const newCartItem = prevCart.items.map(el =>
          el.foodId !== item._id
            ? { ...el }
            : { ...el, foodQty: el.foodQty + 1 }
        );
        afterCart = {
          ...prevCart,
          items: [...newCartItem],
          subtotal: prevCart.subtotal + item.price.value,
          total: prevCart.total + item.price.value,
        };
      }
      // storeCart(afterCart);
      return afterCart;
    });
  };

  // const checkStatusBarColor = () => {
  //   // eslint-disable-next-line no-underscore-dangle
  //   const check = scrollY._value < 120;
  //   if (isLight !== check) setIsLight(check);
  //   // console.log(check)
  // };

  const headerStyle = scrollY.interpolate({
    inputRange: [0, 150, 260, 262],
    outputRange: [
      'rgba(255,255,255,0)',
      'rgba(255,255,255,0.7)',
      'rgba(255,255,255,0.7)',
      'rgba(255,255,255,1)',
    ],
    extrapolate: 'clamp',
  });
  const borderStyle = scrollY.interpolate({
    inputRange: [0, 230, 262],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  const backBtnStyle = scrollY.interpolate({
    inputRange: [0, 150, 262],
    outputRange: ['#fff', '#fff', theme.color.primary],
    extrapolate: 'clamp',
  });

  // const { cart, addFoodToCart } = useContext(CartContext)

  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar
        animated
        barStyle={isLight ? 'light-content' : 'dark-content'}
      /> */}
      {isLoading && <StoreLoading />}
      {!isLoading && (
        <FlatList
          data={restaurantInfo.menu_info}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 44 }}
          // onScroll={Animated.event(
          //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          //   { listener: debounce(checkStatusBarColor, 16) }
          // )}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } },
          ])}
          renderItem={({ item }) => (
            <MenuItem
              menu={item}
              restaurantId={restaurantId}
              handleItem={handleItem}
              childCart={childCart}
              increase={increase}
              decrease={decrease}
            />
          )}
          keyExtractor={item => `${item._id}`}
          // contentContainerStyle={styles.container}
          ListHeaderComponent={
            <Banner
              storeName={restaurantInfo.name}
              address={restaurantInfo.address}
              // foods={foods[1]}
            />
          }
        />
      )}
      {!isLoading && (
        <Button
          title={`Add to Order (${childCart.total})`}
          titleStyle={styles.titleBtn}
          buttonStyle={styles.orderBtn}
          activeOpacity={0.5}
          containerStyle={{ paddingHorizontal: 16 }}
          onPress={() =>
            navigation.navigate('Cart', {
              cart: childCart,
              storeName,
              increase,
              decrease,
              address: restaurantInfo.address,
              restaurantId,
              localCartIndex,
            })
          }
        />
      )}
      <Header
        style={{
          headerStyle,
          borderStyle,
          backBtnStyle,
        }}
        storeName={restaurantInfo.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  orderBtn: {
    backgroundColor: theme.color.primary,
    position: 'absolute',
    bottom: 30,
    width: '100%',
    borderRadius: theme.radius.xs,
    height: 44,
  },
  titleBtn: {
    fontFamily: theme.text.fonts.sfpt,
    fontSize: theme.text.size.md,
  },
});

const selectCartIndex = createSelector(
  state => state.cartReducer.cart,
  (_, restaurantId) => restaurantId,
  (cart, restaurantId) => cart.findIndex(el => el.restaurantId === restaurantId)
);

// const mapStateToProps = state => {
//   return {
//     restaurantInfo: state.restaurantReducer.restaurantInfo,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       fetchRestaurantById,
//     },
//     dispatch
//   );
// };

export default StoreScreen;
