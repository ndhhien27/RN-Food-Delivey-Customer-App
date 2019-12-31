import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Button, Icon, ListItem } from 'react-native-elements';
import { theme } from '../constants/theme';

export default function PaymentInfo({ payment }) {
  return (
    <View style={{ paddingVertical: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          type="font-awesome"
          name="credit-card"
          size={20}
          iconStyle={{ paddingRight: 4 }}
        />
        <Text
          style={{
            fontSize: theme.text.size.lg,
            fontFamily: theme.text.fonts['sfpd-bold'],
            textTransform: 'uppercase',
          }}
        >
          Payment
        </Text>
      </View>
      {payment.map(item => (
        <ListItem
          title={item.paymentType}
          key={`${item.id}`}
          subtitle={item.detail}
          bottomDivider
          containerStyle={{ paddingHorizontal: 0 }}
          titleStyle={{
            fontSize: 16,
            fontFamily: theme.text.fonts.sfpt,
            color: theme.color.darkGray,
            textTransform: 'uppercase',
          }}
          subtitleStyle={{
            fontSize: theme.text.size.md,
            fontFamily: theme.text.fonts.sfpt,
            marginTop: 6,
          }}
          chevron
          subtitleProps={{ numberOfLines: 1 }}
        />
      ))}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 8,
        }}
      >
        <Button
          title="Add new payment"
          titleStyle={{
            fontFamily: theme.text.fonts.sfpt,
            fontSize: theme.text.size.md,
            color: theme.color.primary,
          }}
          buttonStyle={{
            backgroundColor: null,
            padding: 0,
          }}
          activeOpacity={0.5}
          TouchableComponent={TouchableHighlight}
          underlayColor="#fff"
          // onPress={() => navigation.navigate('AddAddress')}
        />
      </View>
    </View>
  );
}
