import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../src/routes';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    list: [],
    activeChannelId: null,
    error: null,
    loading: '',
  },
  reducers: {
    initChannels: (state, { payload }) => {
      state.list = [ ...payload ];
    },
    setActiveChannelId: (state, { payload }) => {
      state.activeChannelId = payload;
    },
    addMsgRequest: (state) => { state.loading = 'request' },
    addMsgSuccess: (state, { payload: { message, id } }) => {
      state.messages.push({ id, message });
      state.error = null;
      state.loading = 'success';
    },
    addMsgFailed: (state, action) => {
      state.error = action.payload;
      state.loading = 'failed';
    },
  },
});

export const {
  initChannels,
  setActiveChannelId,
  addMsgRequest,
  addMsgSuccess,
  addMsgFailed
} = channelsSlice.actions;
export default channelsSlice.reducer;