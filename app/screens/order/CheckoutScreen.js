import React, { useState } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { ListItem, Button, Overlay } from 'react-native-elements'
import { theme } from '../../constants/theme'
import OrderModal from './OrderModal'

export default function CheckoutScreen(props) {

  const [isVisible, setIsVisible] = useState(false)
  const [state, setstate] = useState({
    location: [
      {
        id: 1,
        type: 'home address',
        address: '382 Ton Duc Thang, Lien Chieu, Da Nang',
        isSelect: false
      },
      {
        id: 2,
        type: 'workplace',
        address: '54 Nguyen Luong Bang, Hoa Khanh, Da Nang',
        isSelect: false
      },
      {
        id: 3,
        type: 'workplace',
        address: '54 Nguyen Luong Bang, Hoa Khanh, Da Nang',
        isSelect: false
      },
      {
        id: 4,
        type: 'workplace',
        address: '54 Nguyen Luong Bang, Hoa Khanh, Da Nang',
        isSelect: false
      }
    ],
    payment_method: [
      {
        id: 1,
        type: 'Visa',
        card_info: '312381203813',
        isSelect: false
      },
      {
        id: 2,
        type: 'Cash',
        card_info: 'Giao hang truc tiep',
        isSelect: false
      },
      {
        id: 3,
        type: 'Visa',
        card_info: '312381203813',
        isSelect: false
      },
      {
        id: 4,
        type: 'Visa',
        card_info: '312381203813',
        isSelect: false
      },
    ]
  })

  const selectAddress = (item) => {
    item.isSelect = !item.isSelect
    setstate(prev => {
      return {
        ...prev,
        location:
          prev.location.map(el => el.id !== item.id ? { ...el, isSelect: false } : { ...item })
      }
    })
  }

  const selectPayment = (item) => {
    item.isSelect = !item.isSelect
    setstate(prev => {
      return {
        ...prev,
        payment_method:
          prev.payment_method.map(el => el.id !== item.id ? { ...el, isSelect: false } : { ...item })
      }
    })
  }


  const renderListAdress = ({ item }) => (
    <ListItem
      title={item.type}
      titleStyle={styles.listItemTitle}
      contentContainerStyle={{
        marginHorizontal: -5
      }}
      subtitle={item.address}
      subtitleProps={{ numberOfLines: 1 }}
      subtitleStyle={{
        fontFamily: theme.text.fonts.sfui
      }}
      onPress={() => selectAddress(item)}
      containerStyle={[styles.listContainer, {
        borderWidth: item.isSelect ? 1 : 0,
      }]}
      checkmark={{
        color: theme.color.primary,
        type: 'material-community',
        name: 'check-circle',
        opacity: item.isSelect ? 1 : 0,
        size: 26
      }}
      Component={TouchableOpacity}
      activeOpacity={0.5}
    />
  )

  const renderListPayment = ({ item }) => (
    <ListItem
      title={item.type}
      titleStyle={styles.listItemTitle}
      contentContainerStyle={{
        marginHorizontal: -5
      }}
      subtitle={item.card_info}
      subtitleProps={{ numberOfLines: 1 }}
      subtitleStyle={{
        fontFamily: theme.text.fonts.sfui
      }}
      onPress={() => selectPayment(item)}
      containerStyle={[styles.listContainer, {
        borderWidth: item.isSelect ? 1 : 0,
      }]}
      checkmark={{
        type: 'material-community',
        name: 'check-circle',
        color: theme.color.primary,
        opacity: item.isSelect ? 1 : 0,
        size: 26
      }}
      Component={TouchableOpacity}
      activeOpacity={0.5}
    />
  )

  const _toggleModal = () => { setIsVisible(!isVisible) }

  return (
    <View style={{ backgroundColor: theme.color.lightestGray, flex: 1 }}>
      <View style={styles.shadow}>
        <Overlay
          isVisible={isVisible}
          animationType='slide'
          onBackdropPress={() => _toggleModal()}
          overlayStyle={{ borderRadius: 24 }}
          height={475}
        >
          <OrderModal
            hideModal={_toggleModal}
          />
        </Overlay>
        <View style={styles.contentContainer}>
          <View style={{ flex: 1 }}>
            <View style={{ maxHeight: 220 }}>
              <Text style={styles.title}>delivery address</Text>
              <FlatList
                data={state.location}
                renderItem={renderListAdress}
                keyExtractor={item => `address-${item.id}`}
                extraData={state.location}
                alwaysBounceVertical={false}
              />
            </View>
            <View style={{ maxHeight: 220, marginTop: 50 }}>
              <Text style={styles.title}>payment method</Text>
              <FlatList
                data={state.payment_method}
                renderItem={renderListPayment}
                keyExtractor={item => `pay-${item.id}`}
                alwaysBounceVertical={false}
              />
            </View>
          </View>
          <Button
            title='Payment'
            buttonStyle={{
              backgroundColor: theme.color.primary,
              borderRadius: 8,
              marginTop: 50
            }}
            onPress={() => _toggleModal()}
          />
        </View>
      </View >
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: { height: 5, width: 0 },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  contentContainer: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 650,
    marginTop: 20
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: theme.text.fonts["sfui-medium"],
    fontSize: 16,
    marginBottom: 16
  },
  listItemTitle: {
    textTransform: 'uppercase',
    color: theme.color.primary,
    marginBottom: 4,
    fontFamily: theme.text.fonts["sfui-medium"],
    fontSize: 14
  },
  listContainer: {
    borderColor: theme.color.primary,
    borderRadius: 4,
    backgroundColor: theme.color.lightestGray,
    marginBottom: 10
  },
})