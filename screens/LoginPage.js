import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Center from '../components/Center';
import { renderField, renderSwitchField } from '../components/RenderField';
import User from '../constants/actions/User';
import theme from '../constants/theme';

let LoginPage = ({ navigation, handleSubmit}) => {
  const dispatch = useDispatch();
  const loginErrors = useSelector(state => state.user.login)

  const login = (data) => {
    console.log('DATA new', data);
    const loginData = {
      email: data.email || '',
      password: data.password || '',
      keep: data.keep || false,
    };
    dispatch({ type: User.USER_LOGIN, ...loginData })
  };

  const loginInfo = Object.keys(loginErrors).map(key => (
    <Text key={key} style={styles.errorText}>{loginErrors[key]}</Text>
  ));

  return (
    <Center>
      <Text style={styles.pageTitle}>I am on Login screen</Text>
      <View style={styles.errorBox}>
        {loginInfo}
      </View>
      <Field
        keyboardType="email-address"
        label="Email:"
        component={renderField}
        name="email"
      />
      <Field
        keyboardType="default"
        label="Password:"
        component={renderField}
        name="password"
      />
      <Field
        label="Keep me logged in!"
        component={renderSwitchField}
        name="keep"
      />

      <Button
        title="Login"
        onPress={handleSubmit(login)}
      />
    </Center>
  );
}

export default reduxForm({
  form: 'login',
})(LoginPage)

const styles = StyleSheet.create({
  errorBox: {

  },
  errorText: {
    color: theme.COLOR.warning,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 32,
    marginBottom: 12,
  }
});
