import { eventChannel } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';
import io from 'socket.io-client';

import Config from '../constants/config';
import Socket from '../constants/actions/Socket';
import Actions from '../constants/actions/Actions';

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
      emit({ type: Socket.ADD_SOCKET, socket });
      socket.emit('list-rooms', {});
      socket.emit('search', { search: '' });
    });
    socket.on('list-rooms', data => {
      console.log('Emitted LIST-ROOMS');
      emit({ type: Actions.LIST_ROOMS_RESULT, data });
    });
    socket.on('search', data => {
      console.log('Emitted SEARCH');
      emit({ type: Actions.SEARCH_RESULT, data });
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
