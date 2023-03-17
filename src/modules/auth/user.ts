import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import createRequestSaga from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/auth';
import { takeLatest, call } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { User } from 'auth-type';
import { UserState } from 'cert-state-types';

// 사가 생성
export const check = createAction('user/check');
const checkSaga = createRequestSaga('user/check', authAPI.check);
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
  yield takeLatest('user/check', checkSaga);
  yield takeLatest('user/checkFailure', checkFailureSaga);
  yield takeLatest('user/logout', logoutSaga);
}

const userRe = createSlice({
  name: 'user',
  initialState: {
    user: null,
    checkError: null,
  } as UserState,
  reducers: {
    initializeUser: state => {
      state.user = null;
      state.checkError = null;
    },
    tempSetUser: (state, { payload: user }: PayloadAction<User>) => {
      state.user = user;
    },
    checkSuccess: (state, { payload: user }: PayloadAction<{ data: User }>) => {
      state.user = user.data;
      state.checkError = null;
    },
    checkFailure: (state, { payload: error }: PayloadAction<AxiosError>) => {
      state.user = null;
      state.checkError = error;
    },
    logout: state => {
      state.user = null;
    },
  },
});

export const {
  initializeUser,
  tempSetUser,
  checkSuccess,
  checkFailure,
  logout,
} = userRe.actions;
export default userRe.reducer;
