import { createSlice } from '@reduxjs/toolkit';
import { setupEnum } from '../src/utils';

export const enumConnectionState = setupEnum([
  'connect',
  'disconnect',
]);

export const enumModalState = setupEnum([
  'close',
  'open',
]);

const appSlice = createSlice({
  name: 'app',
  initialState: {
    connectionState: '',
    modalState: enumModalState('close'),
    errors: [],
  },
  reducers: {
    setModalState: (state, { payload }) => {
      state.modalState = payload;
    },
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
  setModalState,
} = appSlice.actions;
export default appSlice.reducer;