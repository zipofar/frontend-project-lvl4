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

const reducer = combineReducers({ msgReducer: msgSlice.reducer });
const store = configureStore({
  reducer,
})

export const { addMsg } = msgSlice.actions;

export default store;