import { call, select } from 'redux-saga/effects';

const createRoom = (socket, counterpart) => {
  socket.emit('create-room', { counterpart });
};

export function* createRoomSaga(action) {
  const socket = yield select(state => state.socketStore.socket);
  yield call(createRoom, socket, action.counterpart);
}
