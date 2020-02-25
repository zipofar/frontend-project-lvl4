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
    actionChannelRequest: (state) => { state.loading = enumStateLoadingChannel('request') },
    addChannelSuccess: (state, { payload }) => {
      state.list.push({ ...payload });
      state.error = null;
      state.loading = enumStateLoadingChannel('success');
    },
    updateChannelSuccess: (state, { payload }) => {
      const { id: currentChannelId } = payload;
        state.list = state.list
        .map(channel => (channel.id === currentChannelId ? payload : channel));
        state.error = null;
        state.loading = enumStateLoadingChannel('success');
    },
    actionChannelFailed: (state, { payload }) => {
      state.error = payload;
      state.loading = enumStateLoadingChannel('failed');
    },
  },
});

export const {
  initChannels,
  setActiveChannelId,
  actionChannelRequest,
  addChannelSuccess,
  actionChannelFailed,
  removeChannelSuccess,
  updateChannelSuccess,
} = channelsSlice.actions;

export default channelsSlice.reducer;

export const createChannel = (data, { onHideModal }) => async dispatch => {
  dispatch(actionChannelRequest());
  let res;
  try {
    res = await axios.post(routes.channelsPath(), {
      data:{
        attributes: { ...data },
      }
    });
    onHideModal();
  } catch(err) {
    dispatch(actionChannelFailed(err.toString()));
  }
};

export const editChannel = (data, { onHideModal }) => async dispatch => {
  dispatch(actionChannelRequest());
  let res;
  try {
    res = await axios.patch(routes.channelPath(data.channelId), {
      data:{
        attributes: { name: data.name },
      }
    });
    onHideModal();
  } catch(err) {
    dispatch(actionChannelFailed(err.toString()));
  }
};

export const removeChannel = ({ channelId, channelsList }, { onHideModal }) => async dispatch => {
  dispatch(actionChannelRequest());
  let res;
  try {
    res = await axios.delete(routes.channelPath(channelId));
    const idFirstChannel = channelsList[0].id;
    dispatch(setActiveChannelId(idFirstChannel));
    onHideModal();
  } catch(err) {
    dispatch(actionChannelFailed(err.toString()));
  }
};