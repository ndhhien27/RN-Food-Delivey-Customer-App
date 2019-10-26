import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, StatusBar } from 'react-native'
import { Avatar } from 'react-native-elements'

import { theme } from '../../constants/theme'

function ProfileItem(props) {
  const { label, info, divider = true } = props
  return (
    <View style={[styles.container, { borderBottomWidth: divider ? 1 : 0 }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  )
}

export default function EditProfile(props) {

  // useEffect(() => {
  //   const _navListener = props.navigation.addListener('didFocus', () => {
  //     StatusBar.setBarStyle("dark-content");
  //   });

  //   return () => { _navListener.remove() }
  // }, [])



  const [profile, setProfile] = useState({
    fullName: 'Nguyen Duc Hien',
    email: 'ndhien@gmail.com',
    phone: '123456789',
    gender: 1
  })

  return (
    <View style={{ justifyContent: 'center', flex: 1 }}>
      {/* <StatusBar barStyle='dark-content' /> */}
      <View style={styles.shadow}>
        <View style={styles.contentContainer}>
          <ProfileItem label='Full Name' info={profile.fullName} />
          <ProfileItem label='Email' info={profile.email} />
          <ProfileItem label='Phone' info={profile.phone} />
          <ProfileItem label='Gender' info={profile.gender ? 'Male' : 'Female'} divider={false} />
        </View>
        <Avatar
          source={{ uri: 'http://via.placeholder.com/86x86' }}
          size='xlarge'
          rounded
          containerStyle={styles.avatar}
          showEditButton
          editButton={{
            containerStyle: {
              backgroundColor: theme.color.primary,
              width: 54,
              height: 54,
              borderRadius: 27,
              alignItems: 'center',
              justifyContent: 'center'
            }
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 20,
    fontFamily: theme.text.fonts.sfui,
    color: '#888'
  },
  info: {
    fontSize: 20,
    fontFamily: theme.text.fonts.sfui

  },
  contentContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingTop: 100
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { height: 5, width: 0 },
  },
  avatar: {
    position: 'absolute',
    alignSelf: 'center',
    top: '-25%'
  }
})