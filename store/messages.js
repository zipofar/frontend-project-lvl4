import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../src/routes';
import { removeChannelSuccess } from './channels';

/* eslint no-param-reassign: 0 */

const msgSlice = createSlice({
  name: 'msg',
  initialState: {
    messages: [],
  },
  reducers: {
    initMessages: (state, { payload: { messages } }) => {
      state.messages = [...messages];
    },
    addMsgSuccess: (state, { payload: { message } }) => {
      state.messages.push({ ...message });
    },
  },
  extraReducers: {
    [removeChannelSuccess]: (state, { payload: { channelId } }) => {
      state.messages = state.messages.filter((e) => e.channelId !== channelId);
    },
  },
});

export const {
  initMessages,
  addMsgSuccess,
  removeMsgSuccess,
} = msgSlice.actions;

export const sendMessage = (data, channelId, { resetForm, setError }) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(routes.channelMessagesPath(channelId), {
      data: {
        attributes: { ...data },
      },
    });

    const { data: { data: { attributes: message } } } = res;
    dispatch(addMsgSuccess({ message }));
    resetForm();
  } catch (err) {
    setError(err.toString());
  }
};

export default msgSlice.reducer;
