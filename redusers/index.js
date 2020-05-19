import { combineReducers } from 'redux';

// reducers
import user from './user';
import socket from './socket';
import rtc from './rtc';

// form reducers
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  user,
  socket,
  rtc,

  form: formReducer,
});
