import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../src/routes';

/* eslint no-param-reassign: 0 */

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    list: [],
    activeChannelId: null,
  },
  reducers: {
    initChannels: (state, { payload: { channels } }) => {
      state.list = [...channels];
    },
    setActiveChannelId: (state, { payload: { channelId } }) => {
      state.activeChannelId = channelId;
    },
    addChannelSuccess: (state, { payload: { channel } }) => {
      state.list.push(channel);
    },
    updateChannelSuccess: (state, { payload: { channel: updatedChannel } }) => {
      const { id: currentChannelId } = updatedChannel;
      state.list = state.list.map((channel) => (
        channel.id === currentChannelId ? updatedChannel : channel
      ));
    },
    removeChannelSuccess: (state, { payload: { channelId } }) => {
      state.list = state.list.filter(({ id }) => id !== channelId);
    },
  },
});

export const {
  initChannels,
  setActiveChannelId,
  addChannelSuccess,
  updateChannelSuccess,
  removeChannelSuccess,
} = channelsSlice.actions;

export default channelsSlice.reducer;

export const createChannel = (data, { onHideModal, setError }) => async () => {
  try {
    await axios.post(routes.channelsPath(), {
      data: {
        attributes: { ...data },
      },
    });

    onHideModal();
  } catch (err) {
    setError(err.toString());
  }
};

export const editChannel = (data, { onHideModal, setError }) => async () => {
  try {
    await axios.patch(routes.channelPath(data.channelId), {
      data: {
        attributes: { name: data.name },
      },
    });

    onHideModal();
  } catch (err) {
    setError(err.toString());
  }
};

export const removeChannel = (data, actions) => async (dispatch) => {
  const { channelId, channelsList } = data;
  const { onHideModal, setError } = actions;
  try {
    await axios.delete(routes.channelPath(channelId));
    const idFirstChannel = channelsList[0].id;
    onHideModal();
    dispatch(setActiveChannelId({ channelId: idFirstChannel }));
  } catch (err) {
    setError(err.toString());
  }
};
