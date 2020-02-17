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
  },
});

export const {
  initChannels,
  setActiveChannelId,
} = channelsSlice.actions;
export default channelsSlice.reducer;