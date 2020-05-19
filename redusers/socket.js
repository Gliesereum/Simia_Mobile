import Socket from '../constants/actions/Socket';

const initialState = {
  socket: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Socket.ADD_SOCKET:
      return {
        ...state,
        socket: action.socket,
      }
    case Socket.REMOVE_SOCKET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
