import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, FlatList, StyleSheet } from 'react-native';

import Card from '../components/Card';
import Actions from '../constants/actions/Actions';

const { width } = Dimensions.get('window');

export default function FavouritePage({ navigation }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.user.favorites);

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
