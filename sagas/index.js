import { all, takeEvery } from 'redux-saga/effects';

import Actions from '../constants/actions/Actions';
import User from '../constants/actions/User';

import {
  loginSaga,
  logoutSaga,
  toggleFavoriteSaga,
} from './user';
import {
  ioSaga,
} from './io'
import { searchSaga } from './search';
import { createRoomSaga } from './room';
import { sendMessageSaga } from './messagin';
import {

} from './rtc';

export default function* watcherSaga() {
  yield all([
    takeEvery(User.USER_LOGIN, loginSaga),
    takeEvery(User.USER_LOGOUT, logoutSaga),
    takeEvery(User.USER_LOGIN_SUCCESS, ioSaga),
    takeEvery(Actions.TOGGLE_FAVORITE, toggleFavoriteSaga),
    takeEvery(Actions.SEARCH, searchSaga),
    takeEvery(Actions.CREATE_ROOM, createRoomSaga),
    takeEvery(Actions.SEND_MESSAGE, sendMessageSaga),
  ]);
}
