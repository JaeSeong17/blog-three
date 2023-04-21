import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  GoogleLoginParams,
  LoginParams,
  RegisterParams,
  User,
  VerifyParams,
} from 'auth-type';
import { AuthState, AuthInputParams } from 'root-state-types';
import { AuthFormType } from 'preset-types';

export const login = createAction(
  'auth/login',
  ({ email, password }: LoginParams) => ({
    payload: { email, password },
  }),
);

export const register = createAction(
  'auth/register',
  ({ username, email, password }: RegisterParams) => ({
    payload: { username, email, password },
  }),
);

export const verify = createAction(
  'auth/verify',
  ({ email, code }: VerifyParams) => ({
    payload: { email, code },
  }),
);

export const googleLogin = createAction(
  'auth/googleLogin',
  ({ googleToken }: GoogleLoginParams) => ({
    payload: { googleToken },
  }),
);

// 사가 생성
const loginSaga = createRequestSaga('auth/login', authAPI.login);
const registerSaga = createRequestSaga('auth/register', authAPI.register);
const verifySaga = createRequestSaga('auth/verify', authAPI.verify);
const googleLoginSaga = createRequestSaga(
  'auth/googleLogin',
  authAPI.googleLogin,
);
export function* authSaga() {
  yield takeLatest('auth/login', loginSaga);
  yield takeLatest('auth/register', registerSaga);
  yield takeLatest('auth/verify', verifySaga);
  yield takeLatest('auth/googleLogin', googleLoginSaga);
}

const initialState: AuthState = {
  register: {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    email: '',
    password: '',
  },
  verify: {
    code: '',
  },
  loginRequested: false,
  verification: false,
  auth: null,
  authError: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeField: (
      state,
      { payload: { form, key, value } }: PayloadAction<AuthInputParams>,
    ) => {
      if (form === 'register') {
        state[form][key as 'email' | 'password'] = value;
      } else if (form === 'login') {
        state[form][key as 'email' | 'username' | 'password' | 'password'] =
          value;
      } else if (form === 'verify') {
        state[form][key as 'code'] = value;
      }
    },
    initializeAuth: state => {
      ['register', 'login', 'verify'].forEach(
        type => (state[type] = initialState[type]),
      );
      state.loginRequested = false;
      state.verification = false;
      state.auth = null;
      state.authError = null;
    },
    initializeForm: (state, { payload: form }: PayloadAction<AuthFormType>) => {
      if (form === 'register') {
        state['register'] = initialState['register'];
      } else if (form === 'login') {
        state['login'] = initialState['login'];
      } else {
        state['verify'] = initialState['verify'];
      }
      state.authError = null;
    },
    loginSuccess: (state, { payload: auth }: PayloadAction<{ data: User }>) => {
      state.loginRequested = true;
      state.auth = auth.data;
      state.authError = null;
    },
    loginFailure: (state, { payload: error }: PayloadAction<AxiosError>) => {
      state.loginRequested = false;
      state.authError = error;
    },
    registerSuccess: (
      state,
      { payload: auth }: PayloadAction<{ data: User }>,
    ) => {
      state.auth = auth.data;
      state.authError = null;
    },
    registerFailure: (state, { payload: error }: PayloadAction<AxiosError>) => {
      state.authError = error;
    },
    verifySuccess: (
      state,
      { payload: auth }: PayloadAction<{ data: User }>,
    ) => {
      state.verification = true;
      state.auth = auth.data;
      state.authError = null;
    },
    verifyFailure: (state, { payload: error }: PayloadAction<AxiosError>) => {
      state.verification = false;
      state.auth = null;
      state.authError = error;
    },
  },
});

export const {
  changeField,
  initializeForm,
  initializeAuth,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  verifySuccess,
  verifyFailure,
} = auth.actions;
export default auth.reducer;
