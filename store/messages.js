import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../src/routes';
import utils from '../src/utils';

/* eslint no-param-reassign: 0 */

const { setupEnum } = utils;

export const enumStateLoadingMsg = setupEnum([
  'request',
  'success',
  'failed',
]);

const msgSlice = createSlice({
  name: 'msg',
  initialState: {
    messages: [],
    error: null,
    loading: '',
  },
  reducers: {
    initMessages: (state, { payload }) => {
      state.messages = [...payload];
    },
    actionMsgRequest: (state) => {
      state.error = null;
      state.loading = enumStateLoadingMsg('request');
    },
    actionMsgSuccess: (state) => {
      state.error = null;
      state.loading = enumStateLoadingMsg('success');
    },
    actionMsgFailed: (state, { payload }) => {
      state.error = payload;
      state.loading = enumStateLoadingMsg('failed');
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
