import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Text } from 'react-native';

import Center from '../components/Center';
import User from '../constants/actions/User';

export default function ListPage({ navigation }) {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: User.USER_LOGOUT});
  };

  return (
    <>
      <Center>
        <Text>I am on List screen</Text>
      </Center>
      <Button
        title="Log Out"
        onPress={logOut}
      />
    </>
  )
}
