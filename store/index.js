import { combineReducers } from '@reduxjs/toolkit';
import msgReducer from './messages';

export default combineReducers({ msg: msgReducer });
