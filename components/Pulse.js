import React, { useEffect } from 'react';
import { Animated, Easing, View, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default function Pulse({ size, pulseMaxSize, duration, outputRangeOpacity, backgroundColor }) {
  const anim = new Animated.Value(0);

  useEffect(() => {
    pulse(1);
  });

  const pulse = (value) => {
    Animated.timing(anim, {
      toValue: value,
      duration: duration,
      easing: Easing.in,
      useNativeDriver: false,
    })
      .start(({ finished }) => finished && pulse(value === 0 ? 1 : 0));
  }

  return (
    <View style={[styles.callProcessBox, {
      width: pulseMaxSize,
      height: pulseMaxSize,
      marginLeft: -pulseMaxSize/2,
      marginTop: -pulseMaxSize/2,
    }]}>
      <Animated.View
        style={[
          {
            width: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [size, pulseMaxSize],
            }),
            height: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [size, pulseMaxSize],
            }),
            borderRadius: pulseMaxSize / 2,
            opacity: anim.interpolate({
              inputRange: [0, 1],
              outputRange: outputRangeOpacity,
            }),
            backgroundColor: backgroundColor,
          }
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  callProcessBox: {
    justifyContent: 'center',
    alignItems: 'center',
    left: width/2,
    top: height/2,
    position: 'absolute',
  },
});
