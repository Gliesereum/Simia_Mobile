import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, StyleSheet, Dimensions } from 'react-native';

import Card from '../components/Card';
import theme from '../constants/theme';

const { width } = Dimensions.get('window');

export default function RoomsPage({ navigation }) {
  const rooms = useSelector(state => state.rooms.rooms);

  return (
    <FlatList
      style={styles.listContainer}
      renderItem={({ item }) => {
        return (
          <Card room={item} />
        )
      }}
      keyExtractor={room => room._id}
      data={rooms}
    />
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: theme.COLOR.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  listContainer: {
    width: width,
    paddingVertical: 8,
  },
});
