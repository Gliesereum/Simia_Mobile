import { put, call } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import User from '../constants/actions/User';
import Config from '../constants/config';

const postLogin = (email, password) => {
  return axios({
    method: 'post',
    url: Config.url + '/api/login',
    data: { email, password },
  });
};

export function* loginSaga(action) {
  try {
    const response = yield call(postLogin, action.email, action.password);
    const token = response.data.token;
    const user = jwtDecode(token);
    console.log('KEEP', action.keep);
    if (action.keep) AsyncStorage.setItem('token', token);

    yield put({ type: User.USER_LOGIN_SUCCESS, user, token, keep: action.keep });
  } catch (err) {
    yield put({ type: User.USER_LOGIN_FAILURE, error: err });
  }
}

