import { createSlice } from '@reduxjs/toolkit'

const loading = createSlice({
  name: "loading",
  initialState: {},
  reducers: {
    startLoading: (state, action) => {
      state[action.payload] = true;
    },
    finishLoading: (state, action) => {
      state[action.payload] = false;
    }
  }
});

export const {
  startLoading,
  finishLoading
} = loading.actions
export default loading.reducer;