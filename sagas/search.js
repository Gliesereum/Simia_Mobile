import { call, select } from 'redux-saga/effects';

const emitSearch = (socket, search) => {
  socket.emit('search', { search: search });
};

export function* searchSaga(action) {
  const socket = yield select(state => state.socketStore.socket);
  yield call(emitSearch, socket, action.search);
}
