import { createSlice, createAction } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest, call } from 'redux-saga/effects';

const CHECK = 'user/check';
const CHECK_FAILURE = 'user/checkFailure';
const LOGOUT = 'user/logout';
// 사가 생성
export const check = createAction(CHECK);
const checkSaga = createRequestSaga(CHECK, authAPI.check);
function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStorage is not working');
  }
}
function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const user = createSlice({
  name: 'user',
  initialState: {
    user: null,
    checkError: null,
  },
  reducers: {
    tempSetUser: (state, { payload: user }) => {
      state.user = user;
    },
    checkSuccess: (state, { payload: user }) => {
      state.user = user;
      state.checkError = null;
    },
    checkFailure: (state, { payload: error }) => {
      state.user = null;
      state.checkError = error;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const { tempSetUser, checkSuccess, checkFailure, logout } = user.actions;
export default user.reducer;
