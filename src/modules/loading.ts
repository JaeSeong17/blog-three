import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  [index: string]: boolean;
}

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
