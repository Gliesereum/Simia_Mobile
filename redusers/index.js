import { combineReducers } from 'redux';

// reducers
import user from './user';
import socketStore from './socketStore';
import room from './room';
import rooms from './rooms';
import search from './search';
import status from './status';
import rtc from './rtc';
import view from './view';

// form reducers
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  user,
  socketStore,
  room,
  rooms,
  search,
  status,
  rtc,
  view,
  form: formReducer,
});
