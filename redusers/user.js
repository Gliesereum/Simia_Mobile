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
    default:
      return state;
  }
};

export default reducer;
