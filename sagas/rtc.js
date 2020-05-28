import { call, put, select } from 'redux-saga/effects';
import { mediaDevices } from 'react-native-webrtc';

import Actions from '../constants/actions/Actions';

const getUserMedia = async (video, audio) => {
  let result;
  let sourceId;

  await mediaDevices.enumerateDevices().then(sourceInfo => {
    for (let i = 0; i < sourceInfo.length; i++) {
      if (sourceInfo[i].kind === 'videoinput' && sourceInfo[i].facing === 'front') {
        sourceId = sourceInfo[i].deviceId;
      }
    }
  });

  const constraints = {
    audio: audio ? { echoCancellation: true } : false,
    video: {
      facingMode: 'user',
      optional: sourceId ? [{ sourceId }] : [],
    },
  };

  if (video) {
    await mediaDevices.getUserMedia(constraints)
      .then(stream => result = stream)
      .catch(error => {
        console.log('get local video failed', error);
        result = null;
      });
  }

  if (!video) {
    await mediaDevices.getUserMedia(constraints)
      .then(stream => result = stream)
      .catch(error => {
        console.log('get local video failed', error);
        constraints.video = false;
        mediaDevices.getUserMedia(constraints)
          .then(stream => result = stream)
          .catch(error => {
            console.log('get local audio failed', error);
            result = null;
          });
      })
      .then()
  }

  return result;
};

const getSelf = user => ({
  _id: user.id,
  username: user.username,
  firstName: user.firstName,
  lastName: user.lastName,
  picture: user.picture,
});

const createRoom = (socket, sender, users, group, video) => {
  socket.emit('rtc', { event: 'room', sender, users, isGroup: !!group, group, video });
};

export function* rtcCreateRoomSaga(action) {
  // get devices permissions
  const stream = yield call(getUserMedia, action.video, action.audio);
  console.log('stream', stream);

  if (!stream) {
    yield put({ type: Actions.RTC_CLOSE });
    return;
  }

  if (stream.getVideoTracks().length > 0) {
    stream.getVideoTracks()[0].enabled = action.video;
  }

  yield put({ type: Actions.RTC_SWITCH_VIDEO, video: action.video });
  yield put({ type: Actions.RTC_SWITCH_AUDIO, audio: action.audio });
  yield put({ type: Actions.RTC_LOCAL_STREAM, stream });

  const user = yield select(state => state.user);
  const socket = yield select(state => state.socketStore.socket);
  const sender = getSelf(user);
  yield call(createRoom, socket, sender, action.users, action.group, action.video);
}

export function* switchVideo(action) {
  const localStream = yield select(state => state.rtc.localStream);
  if (!localStream) return;

  const pcs = yield select(state => state.rtc.pcs);
  const user = yield select(state => state.user);
  const socket = yield select(state => state.socketStore.socket);
  const sender = getSelf(user);

  localStream.getVideoTracks().forEach(track => track.enabled = !!action.video);

  Object.keys(pcs).forEach(async userID => {
    socket.emit('rtc', { event: 'switch-video', video: !!action.video, user: { _id: userID }, sender });
  })
}

export function* switchPeerVideo(action) {
  const pcs = yield select(state => state.rtc.pcs);
  const receivers = pcs[action.peer._id].getReceivers();

  for (let receiver of receivers) {
    if (receiver.track.kind === 'video') receiver.track.enabled = action.video;
  }

  yield put({ type: Actions.RTC_SET_PEER_VIDEO, peer: action.peer, video: action.video });
  yield put({ type: Actions.RTC_SWITCHED_PEER_VIDEO });
}

export function* switchAudio(action) {
  const localStream = yield select(state => state.rtc.localStream);
  if (!localStream) return;

  localStream.getAudioTracks().forEach(track => track.enabled = !!action.audio)
}

export function* closeSaga() {

}
