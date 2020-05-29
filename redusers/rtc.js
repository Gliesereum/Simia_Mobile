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

const removePeer = (array, element) => {
  let result = [...array];
  let i = 0;
  let found = false;
  while (i < result.length && !found) {
    if (element._id === array[i]._id) {
      result.splice(i, 1);
      found = true;
    }
    i++;
  }
  return result;
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
    case Actions.RTC_INCOMING:
      return {
        ...state,
        user: action.user,
        room: action.room,
        status: Views.OUTGOING,
        peerVideo: action.peerVideo ? { ...state.peerVideo, ...action.peerVideo } : state.peerVideo,
      };
    case Actions.RTC_REMOTE_REMOVE_VIDEO_STREAM:
      const newVideoStreams = state.videoStreams
        .filter(stream => stream.getVideoTracks()[0].id !== action.stream.getVideoTracks()[0].id);
      return {
        ...state,
        videoStreams: newVideoStreams,
        streams: {
          ...state.streams,
          [action.peer._id]: null,
        },
      };
    case Actions.RTC_EXIT:
      let newPeers = [...state.peers];
      newPeers.splice(newPeers.indexOf(action.peer._id), 1);
      if (!state.room) return {
        ...state, peers: newPeers,
      };
      return {
        ...state,
        room: {
          ...state.room,
          exit: [...state.room.peers, action.peer],
          ring: removePeer(state.room.ring, action.peer),
          peers: removePeer(state.room.peers, action.peer),
        },
        peers: newPeers,
      };
    case Actions.RTC_TERMINATED:
    case User.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
