import { combineReducers } from 'redux';

// reducers
import user from './user';
import socketStore from './socketStore';
import room from './room';
import rooms from './rooms';
import search from './search';
import rtc from './rtc';

// form reducers
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  user,
  socketStore,
  room,
  rooms,
  search,
  rtc,

  form: formReducer,
});
