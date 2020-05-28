import Actions from '../constants/actions/Actions';

const initialState = {
  online: [],
  busy: [],
  away: [],
  available: [],
};

const remove = (array, element) => {
  let result = [...array];
  if (result.includes(element)) result.splice(result.indexOf(element), 1);
  return result;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.STATUS_LIST:
      return {
        ...state,
        online: action.data.online,
        busy: action.data.busy,
        away: action.data.away,
        available: action.data.available,
      };
    case Actions.STATUS_ONLINE:
      return {
        ...state,
        online: state.online.includes(action.data) ? state.online : [...state.online, action.data],
        busy: remove(state.busy, action.data),
        away: remove(state.away, action.data),
      };
    case Actions.STATUS_OFFLINE:
      return {
        ...state,
        online: remove(state.online, action.data),
        busy: remove(state.busy, action.data),
        away: remove(state.away, action.data),
        available: remove(state.available, action.data),
      };
    case Actions.STATUS_BUSY:
      return {
        ...state,
        busy: state.busy.includes(action.data) ? state.busy : [...state.busy, action.data],
        online: remove(state.online, action.data),
        away: remove(state.away, action.data),
      };
    case Actions.STATUS_AWAY:
      return {
        ...state,
        away: state.away.includes(action.data) ? state.away : [...state.away, action.data],
        online: remove(state.online, action.data),
        busy: remove(state.busy, action.data),
      };
    case Actions.STATUS_AVAILABLE:
      return {
        ...state,
        available: state.available.includes(action.data) ? state.available : [...state.available, action.data],
      };
    default:
      return state;
  }
};

export default reducer;
