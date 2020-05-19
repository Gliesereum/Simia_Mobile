import { all, takeEvery } from 'redux-saga/effects';

import Actions from '../constants/actions/Actions';
import User from '../constants/actions/User';

import {
  loginSaga,
} from './user';
import {

} from './rtc';

export default function* watcherSaga() {
  yield all([
    takeEvery(User.USER_LOGIN, loginSaga),
  ]);
}
