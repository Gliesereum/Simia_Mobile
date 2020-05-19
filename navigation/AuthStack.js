import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from '../screens/LoginPage';

const Stack = createStackNavigator();

export function AuthStack({}) {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={LoginPage}
      />
    </Stack.Navigator>
  );
}
