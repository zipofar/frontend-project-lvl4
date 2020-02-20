import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../src/routes';
import { setupEnum } from '../src/utils';

export const enumStateLoadingChannel = setupEnum([
  'request',
  'success',
  'failed',
]);

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
    addChannelRequest: (state) => { state.loading = enumStateLoadingChannel('request') },
    addChannelSuccess: (state, { payload }) => {
      state.list.push({ ...payload });
      state.error = null;
      state.loading = enumStateLoadingChannel('success');
    },
    addChannelFailed: (state, { payload }) => {
      state.error = payload;
      state.loading = enumStateLoadingChannel('failed');
    },
  },
});

export const {
  initChannels,
  setActiveChannelId,
  addChannelRequest,
  addChannelSuccess,
  addChannelFailed,
} = channelsSlice.actions;

export default channelsSlice.reducer;

export const createChannel = (data) => async dispatch => {
  dispatch(addChannelRequest());
  let res;
  try {
    res = await axios.post(routes.channelsPath(), {
      data:{
        attributes: { ...data },
      }
    });
  } catch(err) {
    dispatch(addChannelFailed(err.toString()));
  }
  const { data: { data: { attributes } } } = res;
  dispatch(addChannelSuccess(attributes));
}