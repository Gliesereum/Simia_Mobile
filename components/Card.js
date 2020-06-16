import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../constants/theme';
import Config from '../constants/config';
import Actions from '../constants/actions/Actions';
import { rtcCall, findUserToken, sendPush } from '../utils';

export default function Card({ room }) {
  const { people } = room;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const status = useSelector(state => state.status);

  let other = {};

  if (!room.isGroup) {
    people.forEach(person => {
      if (user.id !== person._id) other = person;
    });
  }

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

  const getClass = () => {
    let statusClass = 'offline';
    if (status.online.includes(other._id)) statusClass = 'online';
    if (status.away.includes(other._id)) statusClass = 'away';
    if (status.busy.includes(other._id)) statusClass = 'busy';

    return statusClass;
  };

  const toggleFavorite = () => dispatch({ type: Actions.TOGGLE_FAVORITE, roomID: room._id });

  const handleCall = async () => {
    const otherDeviceToken = await findUserToken(other.username);

    if (otherDeviceToken) {
      // make push sending to other user with `$otherDeviceToken` token
      console.log('otherDeviceToken', otherDeviceToken);
      await sendPush(otherDeviceToken, { username: other.username });
    }

    rtcCall({ room, status, other, video: false, audio: true, dispatch });
  };

  const handleVideoCall = () => {
    rtcCall({ room, status, other, video: true, audio: true, dispatch });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Picture picture={room.isGroup ? room.picture : other.picture} user={other} />
        {!room.isGroup && <View style={{ ...styles.statusBox, ...styles[getClass()] }} />}
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.email}>{room.isGroup ? 'Group' : `@${other.username}`}</Text>
      </View>
      <View style={styles.features}>
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon name="star" size={32} color={theme.COLOR[isFavorite ? 'active' : 'secondary']} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCall}>
          <Icon name="phone" size={32} color={theme.COLOR.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleVideoCall}>
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
    position: 'relative',
  },
  imgText: {
    color: theme.COLOR.primary,
  },
  username: {
    fontSize: 16,
  },
  statusBox: {
    width: 12,
    height: 12,
    borderRadius: 25,
    position: 'absolute',
    bottom: 0,
    right: 8,
    zIndex: 1,
  },
  offline: {
    backgroundColor: 'gray',
  },
  busy: {
    backgroundColor: 'red',
  },
  away: {
    backgroundColor: 'orange',
  },
  online: {
    backgroundColor: '#55d48b',
  },
});
