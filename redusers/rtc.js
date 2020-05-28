import Actions from '../constants/actions/Actions';
import Views from '../constants/actions/Views';
import User from '../constants/actions/User';

const initialState = {
  peerConnection: null,
  localStream: null,
  videoStreams: [],
  audioStreams: [],
  status: null,
  audio: true,
  video: true,

  room: null,
  user: null,
  pcs: {},
  streams: {},
  peers: [],
  peerVideo: {},
  muteCount: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.RTC_SWITCH_VIDEO:
      return {
        ...state,
        video: action.video,
      };
    case Actions.RTC_SET_PEER_VIDEO:
      return {
        ...state,
        peerVideo: {
          ...state.peerVideo,
          [action.peer._id]: action.video,
        },
      };
    case Actions.RTC_SWITCHED_PEER_VIDEO:
      return {
        ...state,
        muteCount: state.muteCount + 1,
      };
    case Actions.RTC_SWITCH_AUDIO:
      return {
        ...state,
        audio: action.audio,
      };
    case Actions.RTC_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.stream,
      };
    case Actions.RTC_OUTGOING:
      return {
        ...state,
        user: action.user,
        room: action.room,
        status: Views.OUTGOING,
      };
    case User.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
