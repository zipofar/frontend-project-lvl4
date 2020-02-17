import { combineReducers } from '@reduxjs/toolkit';
import msgReducer from './messages';
import channelsReducer from './channels';
import appReducer from './app';

export default combineReducers({
  msg: msgReducer,
  channels: channelsReducer,
  app: appReducer,
});
