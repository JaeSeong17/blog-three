import { createSlice, createAction } from '@reduxjs/toolkit';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';

const LOGOUT = 'user/logout';
export const logout = createAction(LOGOUT);
function* logoutSaga() {
  try {
    console.log('try logout');
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}
export function* userSaga() {
  yield takeLatest(LOGOUT, logoutSaga);
}

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
