import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RootUserState {
  user: string | null;
  tryLogout: boolean;
}

const user = createSlice({
  name: 'user',
  initialState: {
    user: null,
    tryLogout: false,
  } as RootUserState,
  reducers: {
    setRootUser: (state, { payload: user }: PayloadAction<string>) => {
      state.user = user;
    },
    rootLogout: state => {
      state.user = null;
      state.tryLogout = true;
    },
    completeSyncLogout: state => {
      state.tryLogout = false;
    },
  },
});

export const { setRootUser, rootLogout, completeSyncLogout } = user.actions;
export default user.reducer;
