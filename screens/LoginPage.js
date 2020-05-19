import Center from '../components/Center';
import { Button, Text } from 'react-native';
import React from 'react';

export default function LoginPage({ navigation }) {
  return (
    <Center>
      <Text>I am on Login screen</Text>
      <Button
        title="Login"
        onPress={() => {
          console.log('LOGIN!');
        }}
      />
    </Center>
  );
}
