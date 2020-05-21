import Actions from '../constants/actions/Actions';
import User from '../constants/actions/User';

const initialState = {
  rooms: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LIST_ROOMS_RESULT:
      return {
        ...state,
        rooms: action.data.rooms,
      };
    case User.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
