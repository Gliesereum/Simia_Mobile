import User from '../constants/actions/User';

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
    case User.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
