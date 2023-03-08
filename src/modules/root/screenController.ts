import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScreenState {
  currPostUsername: string | null;
  currPostId: string | null;
  currMode: string;
}

interface CurrPostParams {
  username: string;
  postId: string;
}

const screenController = createSlice({
  name: 'screenController',
  initialState: {
    currPostUsername: null,
    currPostId: null,
    currMode: 'root',
  } as ScreenState,
  reducers: {
    setCurrPost: (state, { payload }: PayloadAction<CurrPostParams>) => {
      state.currPostUsername = payload.username;
      state.currPostId = payload.postId;
    },
    setCurrMode: (state, { payload }: PayloadAction<string>) => {
      state.currMode = payload;
    },
  },
});

export const { setCurrMode, setCurrPost } = screenController.actions;
export default screenController.reducer;
