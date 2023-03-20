import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModeSet } from 'preset-types';
import { ScreenControllerState, CurrPostParams } from 'root-state-types';

const screenController = createSlice({
  name: 'screenController',
  initialState: {
    currPostUsername: null,
    currPostId: null,
    currMode: 'none',
  } as ScreenControllerState,
  reducers: {
    setCurrPost: (state, { payload }: PayloadAction<CurrPostParams>) => {
      state.currPostUsername = payload.username;
      state.currPostId = payload.postId;
    },
    setCurrMode: (state, { payload }: PayloadAction<ModeSet>) => {
      state.currMode = payload;
    },
  },
});

export const { setCurrMode, setCurrPost } = screenController.actions;
export default screenController.reducer;
