import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import theme from '../constants/theme';
import Config from '../constants/config';

export default function SearchCard({ user, createRoom }) {
  const Picture = ({ user }) => {
    if (user.picture) {
      return <Image
        style={styles.img}
        source={`${Config.url || ''}/api/images/${user.picture.shieldedID}/256`}
      />
    } else {
      return <View style={styles.img}>
        <Text style={styles.imgText}>{user.firstName.substr(0, 1)}{user.lastName.substr(0, 1)}</Text>
      </View>
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => createRoom(user._id)}
    >
      <View style={styles.imgContainer}>
        <Picture user={user} />
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>{user.firstName} {user.lastName}</Text>
        <Text style={styles.username}>@{user.username}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingRight: 16,
  },
  imgContainer: {
    paddingRight: 8,
    justifyContent: 'center',
  },
  img: {
    height: 46,
    width: 46,
    backgroundColor: theme.COLOR.secondary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgText: {
    color: theme.COLOR.primary,
  },
  username: {
    fontSize: 16,
  },
});
