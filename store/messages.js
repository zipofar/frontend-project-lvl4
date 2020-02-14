import { createSlice, combineReducers, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../src/routes';

const msgSlice = createSlice({
  name: 'msg',
  initialState: {
    messages: [],
    error: null,
    loading: '',
  },
  reducers: {
    addMsgRequest: (state) => state.loading = 'request',
    addMsgSuccess: (state, action) => {
      state.messages.push({ text: action.payload.text });
      state.error = null;
      state.loading = 'success';
    },
    addMsgFailed: (state, action) => {
      state.error = action.payload;
      state.loading = 'failed';
    },
  },
});

export const { addMsgRequest, addMsgSuccess, addMsgFailed } = msgSlice.actions;
export const sendMessage = (message, channdelId) => async dispatch => {
  let res;
  try {
    res = await axios.post(routes.channelMessagesPath(1), {
      data:{
        attributes:{
          message,
        },
      }
    });
  } catch(err) {
    dispatch(addMsgFailed(err.toString()));
  }
  console.log(res)
  dispatch(addMsgSuccess(res));
}

export default msgSlice.reducer;