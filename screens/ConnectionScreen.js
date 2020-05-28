import React from 'react';
import { useSelector } from 'react-redux';

import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

import Center from '../components/Center';
import theme from '../constants/theme';
import Views from '../constants/actions/Views';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ConnectionScreen({ navigation }) {
  const connectionViewMode = useSelector(state => state.view.connection);
  const { video, audio } = useSelector(state => state.rtc);

  const getBottomPanel = () => {
    switch (connectionViewMode) {
      case Views.NONE:
        return <View />;
      case Views.OUTGOING:
        return (
          <TouchableOpacity
            style={{ ...styles.iconBox, backgroundColor: theme.COLOR.active }}
          >
            <Icon
              name="call-end"
              color={theme.COLOR.primary}
              size={24}
            />
          </TouchableOpacity>
        );
      case Views.INCOMING:
        return (
          <>
            <TouchableOpacity
              style={{ ...styles.iconBox, backgroundColor: '#55d48b' }}
            >
              <Icon
                name={video ? "videocam" : "videocam-off"}
                color={theme.COLOR.primary}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.iconBox, backgroundColor: theme.COLOR.active }}
            >
              <Icon
                name="call-end"
                color={theme.COLOR.primary}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.iconBox, backgroundColor: '#55d48b' }}
            >
              <Icon
                name={audio ? "volume-up" : "volume-mute"}
                color={theme.COLOR.primary}
                size={24}
              />
            </TouchableOpacity>
          </>
        );
      case Views.SESSION:
        return (
          <>
            <TouchableOpacity
              style={styles.iconBox}
            >
              <Icon
                name={video ? "videocam" : "videocam-off"}
                color={theme.COLOR.primary}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.iconBox, backgroundColor: theme.COLOR.active }}
            >
              <Icon
                name="call-end"
                color={theme.COLOR.primary}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBox}
            >
              <Icon
                name={audio ? "volume-up" : "volume-mute"}
                color={theme.COLOR.primary}
                size={24}
              />
            </TouchableOpacity>
          </>
        );
      default:
        return <View />
    }
  };

  return (
    <View style={styles.container}>
      <Center>
        <ActivityIndicator size={20} />
      </Center>
      <View style={styles.bottomPanel}>
        {getBottomPanel()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomPanel: {
    backgroundColor: theme.COLOR.secondary,
    height: 62,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    marginHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  videoBox: {

  },
});
