import React from 'react';
import { View, Text, TextInput, Switch, StyleSheet, Dimensions } from 'react-native';
import theme from '../constants/theme'

const { width } = Dimensions.get('window');

export function renderField({ label, keyboardType, input: { onChange, ...restInput } }) {
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

export function renderSwitchField({ label, input: { onChange, ...restInput } }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <Switch
        onValueChange={onChange}
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
    width: width * .8,
    justifyContent: 'space-between',
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
