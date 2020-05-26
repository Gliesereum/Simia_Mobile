import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import Card from '../components/Card';
import Actions from '../constants/actions/Actions';
import Center from '../components/Center';

export default function RoomModalScreen({ navigation }) {
  const dispatch = useDispatch();
  const room = useSelector(state => state.room);

  if (!room._id) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <View style={styles.container}>
      <Card
        room={room}
        toggleFavorite={roomID => dispatch({ type: Actions.TOGGLE_FAVORITE, roomID: roomID })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
});
