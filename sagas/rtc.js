import { call, put, select, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';

import Actions from '../constants/actions/Actions';
import Config from '../constants/config';

const configuration = {
  iceServers: Config.iceServers,
};

const getUserMedia = async (video, audio) => {
  let result = null;
  let sourceId;

  await mediaDevices.enumerateDevices().then(sourceInfo => {
    for (let i = 0; i < sourceInfo.length; i++) {
      if (sourceInfo[i].kind === 'videoinput' && sourceInfo[i].facing === 'front') {
        sourceId = sourceInfo[i].deviceId;
      }
    }
  });

  const constraints = {
    audio: true,
    video: {
      mandatory: {
        minWidth: 640,
        minHeight: 360,
        minFrameRate: 30,
      },
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
  } else {
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

const enterRoom = (socket, sender, roomId, video) => {
  socket.emit('rtc', { event: 'enter', sender, roomId, video });
};

const exitRoom = (socket, sender, roomId) => {
  socket.emit('rtc', { event: 'exit', sender, roomId });
};

const setupListeners = (socket, peerConnection, user, sender, isOffer = false) => {
  console.log(`setting up listeners for PeerConnection with ${user.firstName} ${user.lastName}`);
  return eventChannel(emit => {
    peerConnection.addEventListener('icecandidate', event => {
      console.log('icecandidate event');
      if (event.candidate) {
        socket.emit('rtc', { event: 'ice-candidate', candidate: event.candidate, user, sender });
      }
    });
    peerConnection.addEventListener('iceconnectionstatechange', event => {
      console.log('iceconnectionstatechange event');
      switch (peerConnection.iceConnectionState) {
        case "new":
          break;
        case "connected":
          emit({ type: Actions.RTC_SESSION_ACCEPTED });
          break;
        case "disconnected":
          emit({type: Actions.RTC_EXIT, peer: sender});
          emit({ type: Actions.RTC_CLOSE, emitted: true, peer: user });
          break;
        case "closed":
          emit({type: Actions.RTC_EXIT, peer: sender});
          emit({ type: Actions.RTC_CLOSE, emitted: true, peer: user });
          break;
        case "failed":
          emit({type: Actions.RTC_EXIT, peer: sender});
          emit({ type: Actions.RTC_CLOSE, emitted: true, peer: user });
          break;
        default:
          break;
      }
    });
    peerConnection.addEventListener('signalingstatechange', event => {
      console.log('signalingstatechange');
    })
    peerConnection.addEventListener('addstream', event => {
      console.log('addstream');
      const stream = event.stream;
      emit({ type: Actions.RTC_REMOTE_ADD_VIDEO_STREAM, stream, peer: user });
    });
    peerConnection.addEventListener('negotiationneeded', event => {
      console.log('negotiationneeded');
      if (isOffer) {
        sendOffer(socket, peerConnection, user, sender);
      }
    });
    return () => {};
  });
};

const sendOffer = (socket, peerConnection, user, sender) => {
  peerConnection.createOffer()
    .then(desc => {
      peerConnection.setLocalDescription(desc).then(() => {
        socket.emit('rtc', { event: 'offer', offer: peerConnection.localDescription, user, sender })
      });
    });
};

const sendAnswer = (socket, peerConnection, user, sender, offer) => {
  peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
    .then(() => peerConnection.createAnswer()
      .then(desc => {
        peerConnection.setLocalDescription(desc).then(() => {
          socket.emit('rtc', { event: 'answer', answer: peerConnection.localDescription, user, sender });
        });
      }));
};

const setRemoteDescription = (peerConnection, answer) => {
  const remoteDesc = new RTCSessionDescription(answer);
  peerConnection.setRemoteDescription(remoteDesc);
  return peerConnection;
};

export function* rtcCreateRoomSaga(action) {
  // get devices permissions
  const stream = yield call(getUserMedia, action.video, action.audio);
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

export function* acceptSaga(action) {
  const stream = yield call(getUserMedia, action.video, action.audio);
  if (!stream) {
    yield put({ type: Actions.RTC_CLOSE });
    return;
  }

  if (stream.getVideoTracks().length > 0) {
    stream.getVideoTracks()[0].enabled = !!action.video;
  }

  yield put({ type: Actions.RTC_SWITCH_VIDEO, video: action.video });
  yield put({ type: Actions.RTC_SWITCH_AUDIO, audio: action.audio });
  yield put({ type: Actions.RTC_LOCAL_STREAM, stream });

  const room = yield select(state => state.rtc.room);
  yield put({ type: Actions.RTC_ROOM_ENTER, roomId: room.id, video: action.video });
  yield put({ type: Actions.SOUNDS_STOP });
}

export function* enterRoomSaga(action) {
  const user = yield select(state => state.user);
  const socket = yield select(state => state.socketStore.socket);
  const sender = getSelf(user);

  yield call(enterRoom, socket, sender, action.roomId, action.video);
}

export function* initConnectionSaga(action) {
  const stream = yield select(state => state.rtc.localStream);
  const video = yield select(state => state.rtc.video);
  const socket = yield select(state => state.socketStore.socket);
  const user = yield select(state => state.user);
  const sender = getSelf(user);

  socket.emit('rtc', { event: 'peer-video', sender, video, user: action.peer });

  const peerConnection = new RTCPeerConnection(configuration);
  peerConnection.addStream(stream);
  yield put({ type: Actions.RTC_SETUP_LISTENERS, peerConnection, peer: action.peer, sender, isOffer: true });
  yield put({ type: Actions.RTC_PEER_CONNECTION, peerConnection, peer: action.peer });
}

export function* answerSaga(action) {
  const stream = yield select(state => state.rtc.localStream);
  const socket = yield select(state => state.socketStore.socket);
  const user = yield select(state => state.user);
  const sender = getSelf(user);

  const peerConnection = new RTCPeerConnection(configuration);
  peerConnection.addStream(stream);
  yield put({ type: Actions.RTC_SETUP_LISTENERS, peerConnection, peer: action.peer, sender });
  yield call(sendAnswer, socket, peerConnection, action.peer, sender, action.offer);
  yield put({ type: Actions.RTC_PEER_CONNECTION, peerConnection, peer: action.peer })
}

export function* setupListenersSaga(action) {
  const video = yield select(state => state.rtc.peerVideo[action.peer._id]);
  const socket = yield select(state => state.socketStore.socket);
  const channel = yield call(setupListeners, socket, action.peerConnection, action.peer, action.sender, action.isOffer);

  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

export function* setRemoteDescriptionSaga(action) {
  const peerConnection = yield select(state => state.rtc.pcs[action.peer._id]);
  yield call(setRemoteDescription, peerConnection, action.answer);
}

export function* gotCandidateSaga(action) {
  const peerConnection = yield select(state => state.rtc.pcs[action.peer._id]);
  const gotCandidate = (peerConnection, candidate) => {
    try {
      peerConnection.addIceCandidate(candidate);
    } catch (e) {
      console.log('candidate error', e);
    }
  };

  const checkCandidate = () => {
    if (peerConnection && peerConnection.iceConnectionState !== 'closed') {
      gotCandidate(peerConnection, action.candidate);
    }
  };

  checkCandidate();
}

export function* switchVideo(action) {
  const localStream = yield select(state => state.rtc.localStream);
  if (!localStream) return;

  const pcs = yield select(state => state.rtc.pcs);
  const user = yield select(state => state.user);
  const socket = yield select(state => state.socketStore.socket);
  const sender = getSelf(user);

  localStream.getVideoTracks().forEach(track => track.enabled = !!action.video);

  Object.keys(pcs).forEach(userID => {
    socket.emit('rtc', { event: 'switch-video', video: !!action.video, user: { _id: userID }, sender });
  });
}

export function* switchPeerVideo(action) {
  const pcs = yield select(state => state.rtc.pcs);

  yield put({ type: Actions.RTC_SET_PEER_VIDEO, peer: action.peer, video: action.video });
  yield put({ type: Actions.RTC_SWITCHED_PEER_VIDEO });
}

export function* switchAudio(action) {
  const localStream = yield select(state => state.rtc.localStream);
  if (!localStream) return;

  localStream.getAudioTracks().forEach(track => track.enabled = !!action.audio)
}

export function* closeSaga(action) {
  const pcs = yield select(state => state.rtc.pcs);
  const room = yield select(state => state.rtc.room);
  const peers = yield select(state => state.rtc.peers);
  const streams = yield select(state => state.rtc.streams);

  if (peers.length > 0 && action.emitted) {
    const peerConnection = pcs[action.peer._id];
    if (peerConnection && peerConnection.connectionState !== 'closed') peerConnection.close();
    if (streams[action.peer._id]) yield put({ type: Actions.RTC_REMOTE_REMOVE_VIDEO_STREAM, stream: streams[action.peer._id], peer: action.peer });
    return;
  }
  const localStream = yield select(state => state.rtc.localStream);
  Object.keys(pcs).forEach(key => {
    const peerConnection = pcs[key];
    if (peerConnection && peerConnection.connectionState !== 'state') peerConnection.close();
  });
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
  }
  const user = yield select(state => state.user);
  const socket = yield select(state => state.socketStore.socket);
  const sender = getSelf(user);
  if (!action.emitted && room) yield call(exitRoom, socket, sender, room.id);
  yield put({ type: Actions.RTC_TERMINATED });
}

export function* terminatedSaga(action) {
  const socket = yield select(state => state.socketStore.socket);
  socket.emit('online');
  yield put({ type: Actions.SOUNDS_STOP });
}
