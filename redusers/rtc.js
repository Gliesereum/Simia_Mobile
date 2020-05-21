import Actions from '../constants/actions/Actions';
import User from '../constants/actions/User';

const initialState = {
  peerConnection: null,
  localStream: null,
  videoStreams: [],
  audioStreams: [],
  status: null,
  audio: true,
  video: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case User.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
