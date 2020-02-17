import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../src/routes';
import { setupEnum } from '../src/utils';

export const getStateLoadingMsg = setupEnum([
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
      state.messages = [ ...payload ];
    },
    addMsgRequest: (state) => { state.loading = getStateLoadingMsg('request') },
    addMsgSuccess: (state, { payload }) => {
      state.messages.push({ ...payload });
      state.error = null;
      state.loading = getStateLoadingMsg('success');
    },
    addMsgFailed: (state, { payload }) => {
      state.error = payload;
      state.loading = getStateLoadingMsg('failed');
    },
  },
});

export const {
  initMessages,
  addMsgRequest,
  addMsgSuccess,
  addMsgFailed
} = msgSlice.actions;

export const sendMessage = (data, channdelId) => async dispatch => {
  dispatch(addMsgRequest());
  let res;
  try {
    res = await axios.post(routes.channelMessagesPath(channdelId), {
      data:{
        attributes: { ...data },
      }
    });
  } catch(err) {
    dispatch(addMsgFailed(err.toString()));
  }
  const { data: { data: { attributes } } } = res;
  dispatch(addMsgSuccess(attributes));
}

export default msgSlice.reducer;