import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon, Button } from 'react-native-elements';
import { theme } from '../constants/theme';

function LargeStoreChildElementNoShadow(props) {
  const { item } = props;
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'http://via.placeholder.com/88x88' }}
        style={styles.img}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.address}</Text>
        <View style={styles.otherDetailContainer}>
          <Button
            icon={
              <Icon
                type="material-community"
                name="star"
                color={theme.color.yellow}
                size={17}
              />
            }
            type="clear"
            title={`${item.bookmark}`}
            titleStyle={{
              fontFamily: theme.text.fonts.sfpt,
              fontSize: 13,
              color: 'black',
            }}
            buttonStyle={{ padding: 0 }}
          />
          <Button
            title={item.promotion}
            titleStyle={{ fontFamily: theme.text.fonts.sfpt, fontSize: 13 }}
            buttonStyle={{
              backgroundColor: theme.color.primary,
              paddingVertical: 0,
              paddingHorizontal: 10,
              height: 18,
              borderRadius: 9,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  img: {
    width: 88,
    height: 88,
    borderRadius: theme.radius.xs,
  },
  detailContainer: {
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  otherDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: theme.text.size.md,
    fontFamily: theme.text.fonts['sfpt-medium'],
  },
  subtitle: {
    fontSize: theme.text.size.sm,
    fontFamily: theme.text.fonts.sfpt,
    color: theme.color.darkGray,
    paddingVertical: theme.space['2xs'],
  },
});

export default withNavigation(LargeStoreChildElementNoShadow);
