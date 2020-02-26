import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../src/routes';
import utils from '../src/utils';

/* eslint no-param-reassign: 0 */

const { setupEnum } = utils;

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
      state.list = [...payload];
    },
    setActiveChannelId: (state, { payload }) => {
      state.activeChannelId = payload;
    },
    actionChannelRequest: (state) => {
      state.error = null;
      state.loading = enumStateLoadingChannel('request');
    },
    actionChannelSuccess: (state) => {
      state.error = null;
      state.loading = enumStateLoadingChannel('success');
    },
    actionChannelFailed: (state, { payload }) => {
      state.error = payload;
      state.loading = enumStateLoadingChannel('failed');
    },
    addChannelSuccess: (state, { payload }) => {
      state.list.push({ ...payload });
    },
    updateChannelSuccess: (state, { payload }) => {
      const { id: currentChannelId } = payload;
      state.list = state.list.map((channel) => (
        channel.id === currentChannelId ? payload : channel
      ));
    },
    removeChannelSuccess: (state, { payload }) => {
      state.list = state.list.filter(({ id }) => id !== payload);
    },
  },
});

export const {
  initChannels,
  setActiveChannelId,
  actionChannelRequest,
  actionChannelSuccess,
  actionChannelFailed,
  addChannelSuccess,
  updateChannelSuccess,
  removeChannelSuccess,
} = channelsSlice.actions;

export default channelsSlice.reducer;

export const createChannel = (data, { onHideModal }) => async (dispatch) => {
  dispatch(actionChannelRequest());
  try {
    await axios.post(routes.channelsPath(), {
      data: {
        attributes: { ...data },
      },
    });

    onHideModal();
    dispatch(actionChannelSuccess());
  } catch (err) {
    dispatch(actionChannelFailed(err.toString()));
  }
};

export const editChannel = (data, { onHideModal }) => async (dispatch) => {
  dispatch(actionChannelRequest());
  try {
    await axios.patch(routes.channelPath(data.channelId), {
      data: {
        attributes: { name: data.name },
      },
    });

    onHideModal();
    dispatch(actionChannelSuccess());
  } catch (err) {
    dispatch(actionChannelFailed(err.toString()));
  }
};

export const removeChannel = ({ channelId, channelsList }, { onHideModal }) => async (dispatch) => {
  dispatch(actionChannelRequest());
  try {
    await axios.delete(routes.channelPath(channelId));
    const idFirstChannel = channelsList[0].id;
    onHideModal();
    dispatch(actionChannelSuccess());
    dispatch(setActiveChannelId(idFirstChannel));
  } catch (err) {
    dispatch(actionChannelFailed(err.toString()));
  }
};
