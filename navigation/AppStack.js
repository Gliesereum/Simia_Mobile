import React from 'react';
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import SearchPage from '../screens/SearchPage';
import RoomsPage from '../screens/RoomsPage';
import theme from '../constants/theme';
import User from '../constants/actions/User';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export function SearchStack({}) {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: User.USER_LOGOUT});
  };

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => {
          return (
            <Button
              title="Log Out"
              onPress={logOut}
            />
          );
        },
        headerTitle: route.name,
      })}
    >
      <Stack.Screen
        name="Search List"
        component={SearchPage}
      />
    </Stack.Navigator>
  );
}

export function RoomsStack({}) {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: User.USER_LOGOUT});
  };

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => {
          return (
            <Button
              title="Log Out"
              onPress={logOut}
            />
          );
        },
        headerTitle: route.name,
      })}
    >
      <Stack.Screen
        name="Rooms List"
        component={RoomsPage}
      />
    </Stack.Navigator>
  );
}

export function AppStack({}) {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Search') {
            return <Icon name="search" size={size} color={color} />
          }

          if (route.name === 'Rooms') {
            return <Icon name="view-list" size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.COLOR.active,
        inactiveTintColor: theme.COLOR.secondary,
      }}
      initialRouteName="Search"
    >
      <Tabs.Screen
        name="Search"
        component={SearchStack}
      />
      <Tabs.Screen
        name="Rooms"
        component={RoomsStack}
      />
    </Tabs.Navigator>
  )
}
