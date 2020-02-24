import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../src/routes';
import { setupEnum } from '../src/utils';
import { removeMsgSuccess } from './messages';

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
    removeChannelSuccess: (state, { payload }) => {
      const filteredChannels = state.list
        .filter(({ id }) => id !== payload);
      state.list = filteredChannels;
      state.loading = enumStateLoadingChannel('success');
    },
    addChannelRequest: (state) => { state.loading = enumStateLoadingChannel('request') },
    addChannelSuccess: (state, { payload }) => {
      const { id: newChannelId } = payload;
      const issetChannel = state.list
        .filter(({ id }) => id === newChannelId)
        .length > 0;
      if (!issetChannel) {
        state.list.push({ ...payload });
        state.error = null;
        state.loading = enumStateLoadingChannel('success');
      }
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
  removeChannelSuccess,
} = channelsSlice.actions;

export default channelsSlice.reducer;

export const createChannel = (data, { onHideModal }) => async dispatch => {
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
  onHideModal();
};

export const removeChannel = ({ channelId, channelsIds }, { onHideModal }) => async dispatch => {
  dispatch(addChannelRequest());
  let res;
  try {
    res = await axios.delete(routes.channelPath(channelId));
  } catch(err) {
    dispatch(addChannelFailed(err.toString()));
  }
  dispatch(removeChannelSuccess(channelId));
  dispatch(removeMsgSuccess(channelId));
  const idFirstChannel = channelsIds[0];
  dispatch(setActiveChannelId(idFirstChannel));
  onHideModal();
};