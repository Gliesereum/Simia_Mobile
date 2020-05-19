import React from 'react';
import { Button, Text } from 'react-native';
import { Field, reduxForm } from 'redux-form';

import Center from '../components/Center';
import { renderTextField } from '../components/RenderTextField';

let LoginPage = ({ navigation, handleSubmit}) => {
  const submit = (data) => {
    console.log('DATA new', data);
  }

  return (
    <Center>
      <Text>I am on Login screen</Text>

      <Field
        keyboardType="email-address"
        label="Email:"
        component={renderTextField}
        name="email"
      />
      <Field
        keyboardType="default"
        label="Password:"
        component={renderTextField}
        name="password"
      />

      <Button
        title="Login"
        onPress={handleSubmit(submit)}
      />
    </Center>
  );
}

export default reduxForm({
  form: 'login',
})(LoginPage)
