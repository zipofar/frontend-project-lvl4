import { combineReducers } from '@reduxjs/toolkit';
import msgReducer from './messages';
import channelsReducer from './channels';

export default combineReducers({ msg: msgReducer, channels: channelsReducer });
