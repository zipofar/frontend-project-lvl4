import { createSlice } from '@reduxjs/toolkit';
import { setupEnum } from '../src/utils';

export const enumConnectionState = setupEnum([
  'connect',
  'disconnect',
]);

const appSlice = createSlice({
  name: 'app',
  initialState: {
    connectionState: '',
    errors: [],
  },
  reducers: {
    setConnectionState: (state, { payload }) => {
      state.connectionState = payload;
    },
    setAppError: (state, { payload }) => {
      state.errors.push(payload);
    },
    unsetAppError: (state, { payload }) => {
      const filteredErrors = state.errors.filter((e) => (e.id !== payload));
      state.errors = filteredErrors;
    },
  },
});

export const {
  setAppError,
  unsetAppError,
  setConnectionState,
} = appSlice.actions;
export default appSlice.reducer;