import { createSlice, createAction } from '@reduxjs/toolkit';
import createRequestSaga from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const LOGIN = 'auth/login';
const REGISTER = 'auth/register';
export const login = createAction(LOGIN, ({ username, password }) => ({
  payload: {
    username,
    password,
  },
}));
export const register = createAction(REGISTER, ({ username, password }) => ({
  payload: {
    username,
    password,
  },
}));

// 사가 생성
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
export function* authSaga() {
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, registerSaga);
}

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeField: (state, { payload: { form, key, value } }) => {
      state[form][key] = value;
    },
    initializeForm: (state, { payload: form }) => {
      state[form] = initialState[form];
      state.authError = null;
    },
    loginSuccess: (state, { payload: auth }) => {
      state.auth = auth;
      state.authError = null;
    },
    loginFailure: (state, { payload: error }) => {
      state.authError = error;
    },
    registerSuccess: (state, { payload: auth }) => {
      state.auth = auth;
      state.authError = null;
    },
    registerFailuer: (state, { payload: error }) => {
      state.authError = error;
    }
  },
});

export const { changeField, initializeForm, loginSuccess, loginFailure } =
  auth.actions;
export default auth.reducer;
