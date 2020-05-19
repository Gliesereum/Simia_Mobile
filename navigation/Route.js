import React, { useState, useEffect }  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import Center from '../components/Center';

export const Routes = ({}) => {
  // TODO: change with store user
  const user = {
    email: 'r@gmail.com',
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(userStr => {
        if (userStr) {
          // decode
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  return (
    <NavigationContainer>
      {
        user ? <AuthStack /> : <AppStack />
      }
    </NavigationContainer>
  )
};
