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
  rtcCreateRoomSaga,
  acceptSaga,
  enterRoomSaga,
  initConnectionSaga,
  setupListenersSaga,
  answerSaga,
  setRemoteDescriptionSaga,
  gotCandidateSaga,
  switchVideo,
  switchPeerVideo,
  switchAudio,
  closeSaga,
  terminatedSaga,
} from './rtc';
import {
  ringSaga,
  stopSaga,
} from './sounds';

export default function* watcherSaga() {
  yield all([
    takeEvery(User.USER_LOGIN, loginSaga),
    takeEvery(User.USER_LOGOUT, logoutSaga),
    takeEvery(User.USER_LOGIN_SUCCESS, ioSaga),
    takeEvery(Actions.TOGGLE_FAVORITE, toggleFavoriteSaga),
    takeEvery(Actions.SEARCH, searchSaga),
    takeEvery(Actions.CREATE_ROOM, createRoomSaga),
    takeEvery(Actions.SEND_MESSAGE, sendMessageSaga),
    takeEvery(Actions.RTC_ROOM_CREATE, rtcCreateRoomSaga),
    takeEvery(Actions.RTC_ACCEPT, acceptSaga),
    takeEvery(Actions.RTC_ROOM_ENTER, enterRoomSaga),
    takeEvery(Actions.RTC_ENTER, initConnectionSaga),
    takeEvery(Actions.RTC_SETUP_LISTENERS, setupListenersSaga),
    takeEvery(Actions.RTC_OFFER, answerSaga),
    takeEvery(Actions.RTC_REMOTE_DESC, setRemoteDescriptionSaga),
    takeEvery(Actions.RTC_CANDIDATE, gotCandidateSaga),
    takeEvery(Actions.RTC_SWITCH_VIDEO, switchVideo),
    takeEvery(Actions.RTC_SWITCH_PEER_VIDEO, switchPeerVideo),
    takeEvery(Actions.RTC_SWITCH_AUDIO, switchAudio),
    takeEvery(Actions.SOUNDS_RING, ringSaga),
    takeEvery(Actions.SOUNDS_STOP, stopSaga),
    takeEvery(Actions.RTC_CLOSE, closeSaga),
    takeEvery(Actions.RTC_TERMINATED, terminatedSaga),
  ]);
}
