import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../constants/theme'

export function renderTextField({ label, keyboardType, input: { onChange, ...restInput } }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        style={styles.input}
        onChangeText={onChange}
        {...restInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 80,
  },
  input: {
    borderColor: theme.COLOR.secondary,
    borderWidth: 1,
    height: 37,
    width: 220,
    padding: 5,
  },
});
