import { createSlice } from '@reduxjs/toolkit';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';

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
  yield takeLatest(rootLogout, logoutSaga);
}

const user = createSlice({
  name: 'user',
  initialState: {
    user: null,
    tryLogout: false,
  },
  reducers: {
    setRootUser: (state, { payload: user }) => {
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
