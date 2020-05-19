import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import List from '../screens/ListPage';
import Connect from '../screens/ConnectPage';

const Stack = createStackNavigator();

export function AppStack({}) {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="List"
    >
      <Stack.Screen
        name="List"
        component={List}
      />
      <Stack.Screen
        name="Connect"
        component={Connect}
      />
    </Stack.Navigator>
  )
}
