import Actions from '../constants/actions/Actions';
import User from '../constants/actions/User';

const initialState = {
  text: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SEARCH:
      return {
        ...state,
        text: action.search,
      }
    case Actions.SEARCH_RESULT:
      return {
        ...state,
        ...action.data,
      };
    case User.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
