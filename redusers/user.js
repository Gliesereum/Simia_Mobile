import User from '../constants/actions/User';
import Actions from '../constants/actions/Actions';

const initialState = {
  favorites: [],
  login: {},
  register: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case User.USER_LOGIN:
      return {
        ...state,
        login: {},
      };
    case User.USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.user,
        token: action.token,
        login: {},
        register: {},
      };
    case User.USER_LOGIN_FAILURE:
      if (action.error.response) return {
        ...state,
        login: action.error.response.data,
      };
      return state;
    case Actions.TOGGLE_FAVORITE_RESULT:
    case Actions.LIST_FAVORITES_RESULT:
      return {
        ...state, favorites: action.data.favorites
      };
    case User.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
