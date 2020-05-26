import User from '../constants/actions/User';
import Actions from '../constants/actions/Actions';

const initialState = {
  images: [],
  messages: [],
  firstMessageID: null,
  lastMessageID: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.CREATE_ROOM_RESULT:
      return {
        ...state,
        ...action.data.room,
        picture: action.data.room.picture || null,
        firstMessageID: action.data.room.messages.length > 0 ? action.data.room.messages[0]._id : state.firstMessageID,
        lastMessageID: action.data.room.messages.length > 0 ? action.data.room.messages[action.data.room.messages.length - 1]._id : state.lastMessageID,
      };
    case User.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
