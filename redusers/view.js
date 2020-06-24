import Views from '../constants/actions/Views';
import Actions from '../constants/actions/Actions';
import User from '../constants/actions/User';

const initialState = {
  connection: Views.view.NONE,
  connectionBackup: Views.view.NONE,
  connectionPerson: null,
  connectionStatus: Views.status.NONE,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.RTC_OUTGOING:
      return {
        ...state,
        connection: Views.view.OUTGOING,
        connectionBackup: state.connection,
        connectionPerson: action.user,
        connectionStatus: Views.status.OUTGOING,
      };
    case Actions.TRY_CONNECTING:
      return {
        ...state,
        connection: Views.view.CONNECTING,
        connectionBackup: state.connection,
        connectionPerson: action.user,
        connectionStatus: Views.status.CONNECTING,
      };
    case Actions.RTC_INCOMING:
      return {
        ...state,
        connection: Views.view.INCOMING,
        connectionBackup: state.connection,
        connectionPerson: action.user,
        connectionStatus: Views.status.INCOMING,
      };
    case Actions.RTC_SESSION_ACCEPTED:
      return {
        ...state,
        connection: Views.view.SESSION,
        connectionBackup: state.connection,
        connectionStatus: Views.status.SESSION,
      };
    case Actions.RTC_TERMINATED:
      return {
        ...state,
        connection: Views.view.NONE,
        connectionBackup: state.connection,
        connectionPerson: null,
        connectionStatus: Views.status.NONE,
      };
    case User.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
export default reducer;
