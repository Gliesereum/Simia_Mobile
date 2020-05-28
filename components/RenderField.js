import React from 'react';
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native';
import theme from '../constants/theme'

export function RenderTextField({
  label,
  keyboardType,
  input: { onChange, ...inputProps },
  inputStyles = {},
  containerStyles = {},
  autoCapitalize = 'sentences',
}) {
  return (
    <View style={{ ...styles.container, ...containerStyles }}>
      {
        label && (
          <Text style={styles.text}>{label}</Text>
        )
      }
      <TextInput
        {...inputProps}
        keyboardType={keyboardType}
        style={{ ...styles.input, ...inputStyles }}
        onChangeText={onChange}
        autoCapitalize={autoCapitalize}
      />
    </View>
  )
}

export function RenderSwitchField({ label, input: { onChange, ...restInput } }) {
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
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 16,
    width: '30%',
  },
  input: {
    borderColor: theme.COLOR.secondary,
    borderWidth: 1,
    height: 40,
    flex: 1,
    padding: 5,
  },
});
