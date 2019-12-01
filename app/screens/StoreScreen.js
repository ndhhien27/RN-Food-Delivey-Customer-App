/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, Animated, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import MenuItem from '../components/MenuItem';
import Banner from '../components/Banner';
import Header from '../components/Header';
import { theme } from '../constants/theme';
import { CartContext } from '../context/CartContext';
import API from '../services/RestaurantService';

function StoreScreen(props) {
  const { cart, updateCartContext, deleteChildCart } = useContext(CartContext);
  const { navigation } = props;
  const { storeId, storeName } = navigation.state.params;
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [childCart, setChildCart] = useState({
    storeId,
    items: [],
    subtotal: 0,
    total: 0,
  });
  // eslint-disable-next-line no-unused-vars
  const [restaurantDetail, setRestaurantDetail] = useState([]);
  useEffect(() => {
    console.log('callAPI');
    API.getRestaurantDetail(
      storeId,
      res => setRestaurantDetail(res.data.data.restaurantById),
      err => console.log(err)
    );
    if (cart.length === 0)
      setChildCart({
        storeId,
        items: [],
        subtotal: 0,
        total: 0,
      });
    else {
      const index = cart.findIndex(el => el.storeId === storeId);
      if (index !== -1) setChildCart(cart[index]);
    }
  }, []);
  useEffect(() => {
    updateCartContext(childCart);
  }, [childCart]);

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
        const ids = [item.foodId];
        const test = restaurantDetail.menu_info;
        test.forEach(function iter(a) {
          if (ids.includes(a._id)) {
            a.checked = true;
          }
          Array.isArray(a.children) && a.children.forEach(iter);
        });
        console.log(test[0]);
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
    item.is_active = !item.is_active;
    setRestaurantDetail(prev => {
      return {
        ...prev,
        menu_info: prev.menu_info.map(el =>
          el._id !== item._id ? { ...el, is_active: false } : { ...item }
        ),
      };
    });
    setChildCart(prevCart => {
      let afterCart = {};
      if (!prevCart.items.find(el => el.foodId === item._id)) {
        afterCart = {
          ...prevCart,
          storeId,
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
      <FlatList
        data={restaurantDetail.menu_info}
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
            storeId={storeId}
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
            storeName={restaurantDetail.name}
            address={restaurantDetail.address}
            // foods={foods[1]}
          />
        }
      />
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
            address: restaurantDetail.address,
            storeId,
          })
        }
      />
      <Header
        style={{
          headerStyle,
          borderStyle,
          backBtnStyle,
        }}
        storeName={restaurantDetail.name}
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

export default StoreScreen;
