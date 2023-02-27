import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setRootUser: (state, { payload: user }) => {
      state.user = user;
    },
  },
});

export const { setRootUser } = user.actions;
export default user.reducer;
