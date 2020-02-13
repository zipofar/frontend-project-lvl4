import { createSlice, combineReducers, configureStore } from '@reduxjs/toolkit';

const msgSlice = createSlice({
  name: 'msg',
  initialState: [],
  reducers: {
    addMsg: (state, action) => {
      state.push({ text: action.payload.text })
    }
  }
});

export const { addMsg } = msgSlice.actions;
export default msgSlice.reducer;