import { combineReducers } from 'redux';

import user from './user';
import rtc from './rtc';

export default combineReducers({
  user,
  rtc,
});
