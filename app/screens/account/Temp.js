import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import { SearchBar, ListItem, Button, Icon } from 'react-native-elements'

import { removeAccents } from '../../helpers/'
import { theme } from '../../constants/theme'

import axios from 'axios'


export default function Temp(props) {
  const { onSelect, data, url, onClose } = props
  const [fullData, setFullData] = useState([])
  const [searchData, setSearchData] = useState([])
  const [searchText, setSearchText] = useState('')

  const fetchData = async () => {
    try {
      const data = await axios.get(url)
      setFullData(prev => {
        return [
          ...data.data.LtsItem
        ]
      })
      setSearchData(prev => {
        return [
          ...data.data.LtsItem
        ]
      }

      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const _handleSearch = (text) => {
    setSearchText(prev => {
      return text
    })
    setSearchData(prev => {
      return fullData.filter(city => {
        let cityConvert = removeAccents(city.Title)
        return cityConvert.toLowerCase().indexOf(text.toLowerCase()) !== -1;
      })
    })
  }
  return (
    <View>
      <View style={styles.header}>
        <Button
          icon={
            <Icon
              type='material-community'
              name='arrow-left'
              color={theme.color.pantone}
              size={28}
            />
          }
          onPress={() => onClose()}
          buttonStyle={{
            backgroundColor: null,
          }}
        />
        <SearchBar
          platform='ios'
          showCancel
          containerStyle={{ backgroundColor: null, padding: 0 }}
          value={searchText}
          onChangeText={_handleSearch}
        />
      </View>
      <View>
        <FlatList
          data={searchData}
          keyExtractor={item => `${item.ID}`}
          renderItem={({ item }) =>
            <ListItem
              title={item.Title}
              bottomDivider
              onPress={() => onSelect(item.Title)}
              titleStyle={{
                fontFamily: theme.text.fonts.sfpro,
                fontSize: 26
              }}
            />
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 24
  }
})