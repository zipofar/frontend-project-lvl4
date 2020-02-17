import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    errors: [],
  },
  reducers: {
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
} = appSlice.actions;
export default appSlice.reducer;