import Views from '../constants/actions/Views';
import Actions from '../constants/actions/Actions';
import User from '../constants/actions/User';

const initialState = {
  connection: Views.NONE,
  connectionBackup: Views.NONE,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.RTC_OUTGOING:
      return {
        ...state,
        connection: Views.OUTGOING,
        connectionBackup: state.connection,
      };
    case Actions.RTC_INCOMING:
      return {
        ...state,
        connection: Views.INCOMING,
        connectionBackup: state.connection,
      };
    case Actions.RTC_SESSION_ACCEPTED:
      return {
        ...state,
        connection: Views.SESSION,
        connectionBackup: state.connection,
      };
    case Actions.RTC_TERMINATED:
      return {
        ...state,
        connection: Views.NONE,
        connectionBackup: state.connection,
      };
    case User.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
export default reducer;
