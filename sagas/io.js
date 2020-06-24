import { eventChannel } from 'redux-saga';
import { call, take, put, select } from 'redux-saga/effects';
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
    // START
    socket.on('authenticated', () => {
      emit({ type: Socket.ADD_SOCKET, socket });
      socket.emit('list-rooms', {});
      socket.emit('list-favorites', {});
      socket.emit('list-status');
      socket.emit('online');
      socket.emit('search', { search: '' });
    });

    // ROOM
    socket.on('list-rooms', data => {
      // console.log('list-rooms');
      emit({ type: Actions.LIST_ROOMS_RESULT, data });
    });
    socket.on('create-room', data => {
      // console.log('create-room', data);
      emit({ type: Actions.CREATE_ROOM_RESULT, data });
    });

    // FAVORITE
    socket.on('list-favorites', data => {
      // console.log('list-favorites', data);
      emit({ type: Actions.LIST_FAVORITES_RESULT, data });
    });
    socket.on('toggle-favorite', data => {
      // console.log('toggle-favorite', data);
      emit({ type: Actions.TOGGLE_FAVORITE_RESULT, data });
    });

    // SEARCH
    socket.on('search', data => {
      // console.log('search', data);
      emit({ type: Actions.SEARCH_RESULT, data });
    });

    // MESSAGING
    socket.on('message-out', data => {
      // console.log('message-out', data);
      socket.emit('list-rooms', {});
    });

    // STATUS
    socket.on('list-status', data => {
      // console.log('list-status', data);
      emit({ type: Actions.STATUS_LIST, data });
    });
    socket.on('online', data => {
      console.log('online', data);
      emit({ type: Actions.STATUS_ONLINE, data });
    });
    socket.on('offline', data => {
      console.log('offline', data);
      emit({ type: Actions.STATUS_OFFLINE, data });
    });
    socket.on('busy', data => {
      console.log('busy', data);
      emit({ type: Actions.STATUS_BUSY, data });
    });
    socket.on('away', data => {
      console.log('away', data);
      emit({ type: Actions.STATUS_AWAY, data });
    });
    socket.on('available', data => {
      console.log('available', data);
      emit({ type: Actions.STATUS_AVAILABLE, data });
    });

    // RTC
    socket.on('rtc', data => {
      switch (data.event) {
        case 'switch-video':
          console.log('switch-video', data);
          emit({ type: Actions.RTC_SWITCH_PEER_VIDEO, video: data.video, peer: data.sender,  });
          break;
        case 'ringing':
          console.log('ringing', data);
          socket.emit('busy');
          emit({ type: Actions.RTC_OUTGOING, room: data.room, user: data.room.ring[0] });
          emit({ type: Actions.SOUNDS_RING });
          break;
        case 'ring':
          console.log('ring', data);
          socket.emit('busy');
          emit({ type: Actions.RTC_INCOMING, room: data.room, user: data.sender, peerVideo: data.peerVideo });
          emit({ type: Actions.RTC_SET_PEER_VIDEO, peer: data.sender, video: data.video, peerVideo: data.peerVideo });
          emit({ type: Actions.SOUNDS_RING });
          break;
        case 'enter':
          console.log('enter', data);
          emit({type: Actions.RTC_SET_PEER_VIDEO, peer: data.sender, video: data.video});
          emit({type: Actions.RTC_ENTER, peer: data.sender});
          emit({type: Actions.SOUNDS_STOP});
          break;
        case 'peer-video':
          console.log('peer-video', data);
          emit({ type: Actions.RTC_SET_PEER_VIDEO, peer: data.sender, video: data.video })
          break;
        case 'ice-candidate':
          // console.log('ice-candidate', data);
          emit({ type: Actions.RTC_CANDIDATE, candidate: data.candidate, peer: data.sender });
          break;
        case 'offer':
          // console.log('offer', data);
          emit({type: Actions.RTC_OFFER, offer: data.offer, peer: data.sender});
          break;
        case 'answer':
          // console.log('answer', data);
          emit({type: Actions.RTC_REMOTE_DESC, answer: data.answer, peer: data.sender});
          break;
        case 'exit':
          console.log('exit', data);
          emit({ type: Actions.RTC_EXIT, peer: data.sender });
          emit({type: Actions.RTC_CLOSE, emitted: true, peer: data.sender});
      }
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
