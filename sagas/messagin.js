import { call, select } from 'redux-saga/effects';

const sendMessage = (socket, { roomID, authorID, content, contentType, fieldID }) => {
  socket.emit('message', { roomID, authorID, content, type: contentType, fieldID });
};

export function* sendMessageSaga(action) {
  const socket = yield select(state => state.socketStore.socket);
  const userID = yield select(state => state.user?.id);
  yield call(sendMessage, socket, {
    roomID: action.data.room._id,
    authorID: userID,
    content: null,
    contentType: 'info',
  });
}
