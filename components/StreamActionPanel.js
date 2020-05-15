import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from '../constants/theme';

function StreamActionPanel({}) {
  const [isMicroOn, setIsMicroOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isCallOn, setIsCallOn] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconBox}
        onPress={() => setIsVideoOn(!isVideoOn)}
      >
        <Icon
          name={isVideoOn ? "videocam" : "videocam-off"}
          color={theme.COLOR.primary}
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.centralButtonBox}
        onPress={() => setIsCallOn(!isCallOn)}
      >
        {
          isCallOn ?
            <Icon name="pause" color={theme.COLOR.primary} size={20} />
            : <Icon name="fiber-manual-record" color={theme.COLOR.active} size={20}/>
        }
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconBox}
        onPress={() => setIsMicroOn(!isMicroOn)}
      >
        <Icon
          name={isMicroOn ? "volume-up" : "volume-mute"}
          color={theme.COLOR.primary}
          size={24}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLOR.secondary,
    height: 62,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centralButtonBox: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: theme.COLOR.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralButtonIcon: {
    width: 32,
    height: 32,
  },
  iconBox: {
    width: 48,
    height: 48,
    marginHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {

  },
});

export default StreamActionPanel;
