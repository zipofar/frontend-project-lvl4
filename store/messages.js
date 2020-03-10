import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../src/routes';

/* eslint no-param-reassign: 0 */

const msgSlice = createSlice({
  name: 'msg',
  initialState: {
    messages: [],
    error: null,
  },
  reducers: {
    initMessages: (state, { payload }) => {
      state.messages = [...payload];
    },
    actionMsgRequest: (state) => {
      state.error = null;
    },
    actionMsgSuccess: (state) => {
      state.error = null;
    },
    actionMsgFailed: (state, { payload }) => {
      state.error = payload;
    },
    addMsgSuccess: (state, { payload }) => {
      state.messages.push({ ...payload });
    },
    removeMsgSuccess: (state, { payload }) => {
      state.messages = state.messages.filter(({ channelId }) => channelId !== payload);
    },
  },
});

export const {
  initMessages,
  actionMsgRequest,
  actionMsgSuccess,
  actionMsgFailed,
  addMsgSuccess,
  removeMsgSuccess,
} = msgSlice.actions;

export const sendMessage = (data, channdelId, { resetForm }) => async (dispatch) => {
  dispatch(actionMsgRequest());
  let res;
  try {
    res = await axios.post(routes.channelMessagesPath(channdelId), {
      data: {
        attributes: { ...data },
      },
    });

    const { data: { data: { attributes } } } = res;
    dispatch(actionMsgSuccess());
    dispatch(addMsgSuccess(attributes));
    resetForm();
  } catch (err) {
    dispatch(actionMsgFailed(err.toString()));
  }
};

export default msgSlice.reducer;
