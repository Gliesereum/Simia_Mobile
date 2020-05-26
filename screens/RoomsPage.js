import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, StyleSheet, Dimensions } from 'react-native';

import Card from '../components/Card';
import theme from '../constants/theme';
import Actions from '../constants/actions/Actions';

const { width } = Dimensions.get('window');

export default function RoomsPage({ navigation }) {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.rooms.rooms);

  return (
    <FlatList
      style={styles.listContainer}
      renderItem={({ item }) => {
        return (
          <Card
            room={item}
            toggleFavorite={roomID => dispatch({ type: Actions.TOGGLE_FAVORITE, roomID: roomID })}
          />
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
