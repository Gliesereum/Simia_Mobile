import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import { RTCView } from 'react-native-webrtc';

import Center from '../components/Center';
import Pulse from '../components/Pulse';
import theme from '../constants/theme';
import Views from '../constants/actions/Views';
import Actions from '../constants/actions/Actions';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get("window");

export default function ConnectionScreen({ navigation }) {
  const connectionViewMode = useSelector(state => state.view.connection);
  const connectionStatus = useSelector(state => state.view.connectionStatus);
  const connectionPerson = useSelector(state => state.view.connectionPerson);
  const videoStreams = useSelector(state => state.rtc.videoStreams);
  const video = useSelector(state => state.rtc.video);
  const audio = useSelector(state => state.rtc.audio);
  const localStream = useSelector(state => state.rtc.localStream);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const getMain = () => {
    switch (connectionViewMode) {
      case Views.view.CONNECTING:
      case Views.view.NONE:
      case Views.view.INCOMING:
      case Views.view.OUTGOING:
        return <Center>
          <Pulse
            size={325}
            pulseMaxSize={275}
            duration={700}
            outputRangeOpacity={[0.1, 0.1]}
            backgroundColor={theme.COLOR.active}
          />
          <Pulse
            size={275}
            pulseMaxSize={225}
            duration={700}
            outputRangeOpacity={[0.2, 0.1]}
            backgroundColor={theme.COLOR.active}
          />
          <Pulse
            size={225}
            pulseMaxSize={175}
            duration={700}
            outputRangeOpacity={[0.3, 0.2]}
            backgroundColor={theme.COLOR.active}
          />
          <Pulse
            size={175}
            pulseMaxSize={125}
            duration={700}
            outputRangeOpacity={[0.4, 0.3]}
            backgroundColor={theme.COLOR.active}
          />
          <Pulse
            size={125}
            pulseMaxSize={75}
            duration={700}
            outputRangeOpacity={[0.5, 0.4]}
            backgroundColor={theme.COLOR.active}
          />
          <Pulse
            size={75}
            pulseMaxSize={25}
            duration={700}
            outputRangeOpacity={[0.6, 0.5]}
            backgroundColor={theme.COLOR.active}
          />
        </Center>;
      case Views.view.SESSION:
        return (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'stretch',
            position: 'relative',
          }}>
            <View style={styles.localVideoContainer}>
              {
                (
                  localStream
                  && localStream.getVideoTracks().length > 0
                  && localStream.getVideoTracks()[0].enabled
                ) ? (
                  <RTCView
                    style={[styles.localRTCVideo]}
                    objectFit={"cover"}
                    streamURL={localStream.toURL()}
                    zOrder={2}
                  />
                ) : (
                  <View style={styles.localRTCVideoOff}>
                    <Text style={styles.localRTCVideoOffText}>
                      {`${user.firstName} ${user.lastName}`}
                    </Text>
                  </View>
                )
              }
            </View>
            {
              videoStreams.length > 0 && videoStreams.map(stream => {
                return (
                    <View
                      key={stream.toURL()}
                      style={styles.remoteVideoContainer}
                    >
                      {
                        stream
                        && stream.getVideoTracks().length > 0
                        && stream.getVideoTracks()[0].enabled ? (
                          <RTCView
                            style={styles.remoteRTCVideo}
                            key={`Remote_RTCView`}
                            streamURL={stream.toURL()}
                            objectFit={"cover"}
                            zOrder={1}
                          />
                        ) : (
                          <View style={styles.remoteRTCVideoOff}>
                            <Text style={styles.remoteRTCVideoOffText}>
                              {
                                connectionPerson
                                && `${connectionPerson.firstName.substr(0,1).toUpperCase()}${connectionPerson.lastName.substr(0,1).toUpperCase()}`
                              }
                            </Text>
                          </View>
                        )
                      }
                    </View>
                  )
              })
            }
          </View>
        )
    }
  };

  const getControls = () => {
    switch (connectionViewMode) {
      case Views.view.NONE:
        return <View />;
      case Views.view.OUTGOING:
      case Views.view.CONNECTING:
        return (
          <TouchableOpacity
            style={{ ...styles.iconBox, backgroundColor: theme.COLOR.active }}
            onPress={() => dispatch({ type: Actions.RTC_CLOSE })}
          >
            <Icon
              name="call-end"
              color={theme.COLOR.primary}
              size={24}
            />
          </TouchableOpacity>
        );
      case Views.view.INCOMING:
        return (
          <>
            <TouchableOpacity
              style={{ ...styles.iconBox, backgroundColor: '#55d48b' }}
              onPress={() => dispatch({ type: Actions.RTC_ACCEPT, video: true, audio: true })}
            >
              <Icon
                name="videocam"
                color={theme.COLOR.primary}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.iconBox, backgroundColor: theme.COLOR.active }}
              onPress={() => dispatch({ type: Actions.RTC_CLOSE })}
            >
              <Icon
                name="call-end"
                color={theme.COLOR.primary}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.iconBox, backgroundColor: '#55d48b' }}
              onPress={() => dispatch({ type: Actions.RTC_ACCEPT, video: false, audio: true })}
            >
              <Icon
                name="volume-up"
                color={theme.COLOR.primary}
                size={24}
              />
            </TouchableOpacity>
          </>
        );
      case Views.view.SESSION:
        return (
          <>
            <TouchableOpacity
              style={styles.iconBox}
              onPress={() => dispatch({ type: Actions.RTC_SWITCH_VIDEO, video: !video })}
            >
              <Icon
                name={video ? "videocam" : "videocam-off"}
                color={theme.COLOR.primary}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.iconBox, backgroundColor: theme.COLOR.active }}
              onPress={() => dispatch({ type: Actions.RTC_CLOSE })}
            >
              <Icon
                name="call-end"
                color={theme.COLOR.primary}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBox}
              onPress={() => dispatch({ type: Actions.RTC_SWITCH_AUDIO, audio: !audio })}
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
      <View style={styles.title}>
        <Text style={styles.status}>
          {connectionStatus}
        </Text>
        {
          connectionPerson
          && <Text style={styles.withPerson}>
            {`${connectionPerson.firstName} ${connectionPerson.lastName}`}
          </Text>
        }
      </View>
      <View style={styles.main}>
        {getMain()}
      </View>
      <View style={styles.bottomPanel}>
        {getControls()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLOR.secondary,
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
  title: {
    position: 'absolute',
    height: 100,
    zIndex: 2,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: width,
    backgroundColor: 'rgba(0, 0, 0, 0.3),'
  },
  status: {
    color: theme.COLOR.primary,
    fontSize: 18,
  },
  withPerson: {
    color: theme.COLOR.primary,
    fontSize: 42,
    fontWeight: 'bold',
  },
  main: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  remoteVideoContainer: {
    flex: 1,
    backgroundColor: theme.COLOR.secondary,
    justifyContent: 'center',
  },
  remoteRTCVideo: {
    flex: 1,
    backgroundColor: theme.COLOR.secondary,
  },
  remoteRTCVideoOff: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    height: 150,
    width: 150,
    borderColor: theme.COLOR.primary,
    borderWidth: 2,
    backgroundColor: theme.COLOR.secondary,
  },
  remoteRTCVideoOffText: {
    color: theme.COLOR.primary,
    fontSize: 48,
  },
  localVideoContainer: {
    position: 'absolute',
    backgroundColor: theme.COLOR.secondary,
    bottom: 5,
    right: 5,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    height: 150,
    zIndex: 999,
    width: 150,
    overflow: 'hidden',
  },
  localRTCVideo: {
    flex: 1,
    backgroundColor: theme.COLOR.secondary,
  },
  localRTCVideoOff: {
    width: 150,
    height: 150,
    backgroundColor: theme.COLOR.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  localRTCVideoOffText: {
    color: theme.COLOR.primary,
  },
});
