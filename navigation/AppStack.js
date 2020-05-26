import React from 'react';
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

import SearchPage from '../screens/SearchPage';
import RoomsPage from '../screens/RoomsPage';
import FavouritePage from '../screens/FavouritePage';
import RoomModalScreen from '../screens/RoomModalScreen';
import theme from '../constants/theme';
import User from '../constants/actions/User';

// app navigator (contain BottomNavigator and Modal)
const AppRootStack = createStackNavigator();

// app tab navigator
const Tabs = createBottomTabNavigator();

// create stack for each screen of app for adding styles for header
const SearchStackNavigator = createStackNavigator();
const RoomsStackNavigator = createStackNavigator();
const FavouriteStackNavigator = createStackNavigator();

export function Search({}) {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: User.USER_LOGOUT});
  };

  return (
    <SearchStackNavigator.Navigator
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
      <SearchStackNavigator.Screen
        name="Search List"
        component={SearchPage}
      />
    </SearchStackNavigator.Navigator>
  );
}

export function Rooms({}) {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: User.USER_LOGOUT});
  };

  return (
    <RoomsStackNavigator.Navigator
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
      <RoomsStackNavigator.Screen
        name="Room List"
        component={RoomsPage}
      />
    </RoomsStackNavigator.Navigator>
  );
}

export function Favourite({}) {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: User.USER_LOGOUT});
  };

  return (
    <FavouriteStackNavigator.Navigator
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
      <FavouriteStackNavigator.Screen
        name="Favourite List"
        component={FavouritePage}
      />
    </FavouriteStackNavigator.Navigator>
  );
}

export function BottomStack({}) {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Search List') {
            return <Icon name="search" size={size} color={color} />
          }

          if (route.name === 'Room List') {
            return <Icon name="list" size={size} color={color} />
          }

          if (route.name === 'Favourite') {
            return <Icon name="star" size={size} color={color} />
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: theme.COLOR.active,
        inactiveTintColor: theme.COLOR.secondary,
      }}
      initialRouteName="Search List"
    >
      <Tabs.Screen
        name="Search List"
        component={Search}
      />
      <Tabs.Screen
        name="Room List"
        component={Rooms}
      />
      <Tabs.Screen
        name="Favourite"
        component={Favourite}
      />
    </Tabs.Navigator>
  )
}

export function AppStack({}) {
  return (
    <AppRootStack.Navigator>
      <AppRootStack.Screen
        options={{
          headerShown: false,
        }}
        name="AppTabs"
        component={BottomStack}
      />
      <AppRootStack.Screen
        name="AppModal"
        component={RoomModalScreen}
      />
    </AppRootStack.Navigator>
  )
}
