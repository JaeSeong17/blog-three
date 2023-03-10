import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingState } from 'loading-state-types';

const loading = createSlice({
  name: 'loading',
  initialState: {} as LoadingState,
  reducers: {
    startLoading: (state, action: PayloadAction<string>) => {
      state[action.payload] = true;
    },
    finishLoading: (state, action: PayloadAction<string>) => {
      state[action.payload] = false;
    },
  },
});

export const { startLoading, finishLoading } = loading.actions;
export default loading.reducer;
