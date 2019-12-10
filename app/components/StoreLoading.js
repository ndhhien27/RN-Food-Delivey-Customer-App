import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { FlatList, Platform } from 'react-native';

export default function StoreLoading() {
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
          width={400}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <Rect x="0" y="0" rx="5" ry="5" width="90%" height="10" />
          <Rect x="0" y="20" rx="5" ry="5" width="30%" height="10" />
        </ContentLoader>
      )}
      ListHeaderComponent={
        <ContentLoader
          height={350}
          width={400}
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
          style={{
            paddingTop: Platform.OS === 'ios' ? 88 : 56,
          }}
        >
          <Rect x="0" y="200" rx="5" ry="5" width="90%" height="10" />
          <Rect x="0" y="220" rx="5" ry="5" width="80%" height="10" />
        </ContentLoader>
      }
      ListHeaderComponentStyle={{ marginBottom: 40 }}
    />
  );
}
