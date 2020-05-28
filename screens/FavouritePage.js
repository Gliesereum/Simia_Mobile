import React from 'react';
import { useSelector } from 'react-redux';
import { Dimensions, FlatList, StyleSheet } from 'react-native';

import Card from '../components/Card';

const { width } = Dimensions.get('window');

export default function FavouritePage({ navigation }) {
  const favorites = useSelector(state => state.user.favorites);

  return (
    <FlatList
      style={styles.listContainer}
      renderItem={({ item }) => {
        return (
          <Card room={item} />
        )
      }}
      keyExtractor={f => f._id}
      data={favorites}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: width,
    paddingVertical: 8,
  },
});
