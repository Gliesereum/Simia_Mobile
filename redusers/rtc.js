import Actions from '../constants/actions/Actions';

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
    default:
      return state;
  }
};

export default reducer;
