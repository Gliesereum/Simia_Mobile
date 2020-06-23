import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { RTCView } from 'react-native-webrtc';

import Center from '../components/Center';
import Pulse from '../components/Pulse';
import theme from '../constants/theme';
import Views from '../constants/actions/Views';
import Actions from '../constants/actions/Actions';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ConnectionScreen({ navigation }) {
  const connectionViewMode = useSelector(state => state.view.connection);
  const videoStreams = useSelector(state => state.rtc.videoStreams);
  const video = useSelector(state => state.rtc.video);
  const audio = useSelector(state => state.rtc.audio);
  const localStream = useSelector(state => state.rtc.localStream);
  const dispatch = useDispatch();

  const getView = () => {
    switch (connectionViewMode) {
      case Views.NONE:
      case Views.INCOMING:
      case Views.OUTGOING:
        return <Center>
          <Pulse size={200} pulseMaxSize={300} duration={1000} outputRangeOpacity={[0.7, 0.1]} backgroundColor={theme.COLOR.active} />
          <Pulse size={150} pulseMaxSize={250} duration={1000} outputRangeOpacity={[0.5, 0.1]} backgroundColor={theme.COLOR.secondary} />
          <Pulse size={125} pulseMaxSize={200} duration={2000} outputRangeOpacity={[0, 0.7]} backgroundColor={theme.COLOR.active} />
          <Pulse size={100} pulseMaxSize={150} duration={2000} outputRangeOpacity={[0, 0.5]} backgroundColor={theme.COLOR.secondary
          } />
        </Center>;
      case Views.SESSION:
        return (
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <View
              style={{
                height: 200,
                width: 300,
                margin: 10,
                padding: 10,
                alignItems: 'center',
                backgroundColor: theme.COLOR.secondary,
              }}
            >
              <Text style={{ color: theme.COLOR.primary }}>Local</Text>
              {
                !localStream.getVideoTracks()[0].muted ? (
                  <RTCView
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      width: '100%',
                    }}
                    streamURL={localStream.toURL()}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <Text
                      style={{
                        color: theme.COLOR.primary,
                      }}
                    >
                      USER
                    </Text>
                  </View>
                )
              }
            </View>
            {
              videoStreams.length > 0 && videoStreams.map(stream => {
                console.log(stream);
                return (
                    <View
                      key={stream.toURL()}
                      style={{
                        height: 200,
                        width: 300,
                        margin: 10,
                        padding: 10,
                        alignItems: 'center',
                        backgroundColor: theme.COLOR.secondary,
                      }}
                    >
                      {
                        !stream.getVideoTracks()[0].muted ? (
                          <RTCView
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '100%',
                              width: '100%',
                            }}
                            key={`Remote_RTCView`}
                            streamURL={stream.toURL()}
                          />
                        ) : (
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: '100%',
                              width: '100%',
                            }}
                          >
                            <Text
                              style={{
                                color: theme.COLOR.primary,
                              }}
                            >
                              User (Receiver)
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

  const getBottomPanel = () => {
    switch (connectionViewMode) {
      case Views.NONE:
        return <View />;
      case Views.OUTGOING:
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
      case Views.INCOMING:
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
      case Views.SESSION:
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
      <Text>Remote</Text>
      {getView()}
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
