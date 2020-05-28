import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';

import { AuthStack } from './AuthStack';
import { AppStack } from './AppStack';
import Center from '../components/Center';
import User from '../constants/actions/User';
import Actions from '../constants/actions/Actions';

export const Routes = ({}) => {
  const [loading, setLoading] = useState(true);
  const id = useSelector(state => state.user.id);
  const exp = useSelector(state => state.user.exp);
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
      if (token && typeof token === 'string') {
        const user = jwtDecode(token);
        dispatch({ type: User.USER_LOGIN_SUCCESS, user, token, keep: true });
        dispatch({ type: Actions.RTC_REGISTER });
      }
      setLoading(false);
    })
      .catch(err => console.log(err));
  }, []);

  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  const currentTime = Date.now() / 1000;
  if (exp < currentTime) {
    AsyncStorage.removeItem('token');
    dispatch(User.USER_LOGOUT);
  }

  return (
    <NavigationContainer>
      {
        (!id || !exp) ? <AuthStack /> : <AppStack />
      }
    </NavigationContainer>
  )
};
