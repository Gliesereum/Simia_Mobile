import { combineReducers } from 'redux';

// reducers
import user from './user';
import socket from './socket';
import room from './room';
import rtc from './rtc';

// form reducers
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  user,
  socket,
  room,
  rtc,

  form: formReducer,
});
