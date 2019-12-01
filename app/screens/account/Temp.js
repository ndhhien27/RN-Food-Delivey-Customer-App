/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { SearchBar, ListItem, Button, Icon } from 'react-native-elements';
import axios from 'axios';
import { removeAccents } from '../../helpers';
import { theme } from '../../constants/theme';

export default function Temp(props) {
  const { onSelect, url, onClose } = props;
  const [fullData, setFullData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    try {
      const data = await axios.get(url);
      setFullData(prev => {
        return [...data.data.LtsItem];
      });
      setSearchData(prev => {
        return [...data.data.LtsItem];
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = text => {
    setSearchText(prev => {
      return text;
    });
    setSearchData(prev => {
      return fullData.filter(city => {
        const cityConvert = removeAccents(city.Title);
        return cityConvert.toLowerCase().indexOf(text.toLowerCase()) !== -1;
      });
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Button
          icon={
            <Icon
              type="material-community"
              name="arrow-left"
              color={theme.color.primary}
              size={theme.icon.size.md}
            />
          }
          onPress={() => onClose()}
          buttonStyle={{
            backgroundColor: null,
          }}
        />
        <SearchBar
          platform="ios"
          showCancel
          containerStyle={{ backgroundColor: null, padding: 0 }}
          value={searchText}
          onChangeText={handleSearch}
          placeholder="Search"
          inputContainerStyle={{ backgroundColor: theme.color.gray }}
        />
      </View>
      <FlatList
        data={searchData}
        keyExtractor={item => `${item.ID}`}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <ListItem
            title={item.Title}
            bottomDivider
            onPress={() => onSelect(item.Title)}
            titleStyle={{
              fontFamily: theme.text.fonts.sfpt,
              fontSize: 26,
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
});
