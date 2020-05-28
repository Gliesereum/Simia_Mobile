import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import Card from '../components/Card';
import Center from '../components/Center';

export default function RoomModalScreen({ navigation }) {
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
      <Card room={room} />
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
