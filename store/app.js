import { createSlice } from '@reduxjs/toolkit';

const CONNECT = 'connect';
const DISCONNECT = 'disconnect';

export const enumConnectionState = (state) => {
  switch (state) {
    case CONNECT: return CONNECT; 
    case DISCONNECT: return DISCONNECT; 
    default:
      throw new Error('No this state for connection state');
  }
};

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
  setConnectionState,
  setAppError,
  unsetAppError,
} = appSlice.actions;
export default appSlice.reducer;