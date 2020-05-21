import { all, takeEvery } from 'redux-saga/effects';

import Actions from '../constants/actions/Actions';
import User from '../constants/actions/User';

import {
  loginSaga,
  logoutSaga,
} from './user';
import {
  ioSaga,
} from './io'
import { searchSaga } from './search';
import {

} from './rtc';

export default function* watcherSaga() {
  yield all([
    takeEvery(User.USER_LOGIN, loginSaga),
    takeEvery(User.USER_LOGOUT, logoutSaga),
    takeEvery(User.USER_LOGIN_SUCCESS, ioSaga),

    takeEvery(Actions.SEARCH, searchSaga),
  ]);
}
