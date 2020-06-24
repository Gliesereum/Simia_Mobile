import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import theme from '../../constants/theme';

const { width } = Dimensions.get("window");

export default function Header({
  speaker,
  status = "",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>
        {status}
      </Text>
      <Text style={styles.speakerText}>
        {`${speaker?.firstName} ${speaker?.lastName}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 100,
    zIndex: 2,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: width,
    backgroundColor: theme.COLOR.secondaryWithOpacity(0.3),
  },
  statusText: {
    color: theme.COLOR.primary,
    fontSize: 18,
  },
  speakerText: {
    color: theme.COLOR.primary,
    fontSize: 42,
    fontWeight: 'bold',
  },
});
