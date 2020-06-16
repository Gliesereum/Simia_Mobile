import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';

import SearchPage from '../screens/SearchPage';
import RoomsPage from '../screens/RoomsPage';
import FavouritePage from '../screens/FavouritePage';
import RoomModalScreen from '../screens/RoomModalScreen';
import ConnectionScreen from '../screens/ConnectionScreen';
import theme from '../constants/theme';
import User from '../constants/actions/User';
import Views from '../constants/actions/Views';
import { prepareDeviceToken, subscribeOnMessage } from '../utils';

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

export function BottomStack({ navigation }) {
  const { connectionBackup, connection } = useSelector(state => state.view)

  // if ring or ringing => go to connection modal
  // when session finished => goBack
  useEffect(() => {
    if (connection === Views.OUTGOING || connection === Views.INCOMING || connection === Views.SESSION) {
      navigation.navigate('ConnectionModal');
    } else if (connectionBackup !== Views.NONE && connection === Views.NONE) {
      navigation.goBack();
    }
  }, [connection])

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
      initialRouteName="Room List"
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
  const username = useSelector(state => state.user.username);
  useEffect(() => {
    prepareDeviceToken(username);

    return subscribeOnMessage()
  }, []);

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
        options={{
          headerTitle: 'Room',
        }}
        component={RoomModalScreen}
      />
      <AppRootStack.Screen
        name="ConnectionModal"
        options={{
          headerShown: false,
        }}
        component={ConnectionScreen}
      />
    </AppRootStack.Navigator>
  )
}
