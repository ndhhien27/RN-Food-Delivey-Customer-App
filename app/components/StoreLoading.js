import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { FlatList, Platform, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function StoreLoading() {
  console.log(width, height);
  const tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <FlatList
      data={tempArr}
      keyExtractor={item => `i-${item}`}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      renderItem={() => (
        <ContentLoader
          style={{ marginTop: 16 }}
          height={60}
          width={width}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <Rect x="0" y="0" rx="10" ry="10" width="90%" height="20" />
          <Rect x="0" y="35" rx="7" ry="7" width="30%" height="14" />
        </ContentLoader>
      )}
      ListHeaderComponent={
        <ContentLoader
          height={350}
          width={width}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
          style={{
            paddingTop: Platform.OS === 'ios' ? 88 : 56,
          }}
        >
          <Rect x="0" y="200" rx="10" ry="10" width="90%" height="20" />
          <Rect x="0" y="235" rx="7" ry="7" width="80%" height="14" />
        </ContentLoader>
      }
      ListHeaderComponentStyle={{ marginBottom: 40 }}
    />
  );
}
