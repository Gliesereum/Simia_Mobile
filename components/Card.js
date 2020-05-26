import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../constants/theme';
import Config from '../constants/config';

export default function Card({ room, toggleFavorite }) {
  const { people } = room;
  const user = useSelector(state => state.user);

  let other = {};

  people.forEach(person => {
    if (user.id !== person._id) other = person;
  })

  const Picture = ({ picture, user }) => {
    if (picture) {
      return <Image
        style={styles.img}
        source={`${Config.url || ''}/api/images/${picture.shieldedID}/256`}
      />
    } else {
      return <View style={styles.img}>
        <Text style={styles.imgText}>{room.isGroup ? room.title.substr(0, 1) : `${user.firstName.substr(0, 1)}${user.lastName.substr(0, 1)}`}</Text>
      </View>
    }
  }

  let title = room.isGroup ? room.title : `${other.firstName} ${other.lastName}`;
  title = title.length > 24 ? `${title.substr(0, 21)}...` : title;

  let isFavorite = false;

  user.favorites && user.favorites.forEach(favorite => {
    if (favorite._id === room._id) isFavorite = true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Picture picture={room.isGroup ? room.picture : other.picture} user={other} />
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.email}>{room.isGroup ? 'Group' : `@${user.username}`}</Text>
      </View>
      <View style={styles.features}>
        <TouchableOpacity onPress={() => toggleFavorite(room._id )}>
          <Icon name="star" size={32} color={theme.COLOR[isFavorite ? 'active' : 'secondary']} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="phone" size={32} color={theme.COLOR.secondary} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="videocam" size={32} color={theme.COLOR.secondary} />
        </TouchableOpacity>
      </View>
    </View>
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
  features: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
