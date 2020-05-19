import { eventChannel } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';
import io from 'socket.io-client';

import Config from '../constants/config';
import Socket from '../constants/actions/Socket';

const ioConnect = token => {
  const socket = io.connect((Config.url || '') + '/', { forceNode: true });
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit('authenticate', { token });
      resolve(socket);
    });
  });
};

function ioSubscribe(socket) {
  return eventChannel(emit => {
    socket.on('authenticated', () => {
      console.log('authenticated emited');
      emit({ type: Socket.ADD_SOCKET, socket });
    });
    return () => {};
  });

}

export function* ioSaga(action) {
  const socket = yield call(ioConnect, action.token);

  const channel = yield call(ioSubscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}
