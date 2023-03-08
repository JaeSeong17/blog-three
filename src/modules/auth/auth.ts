import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import createRequestSaga from '../../lib/createRequestSaga';
import * as authAPI from '../../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { LoginParams } from 'authtype';

interface FormState {
  [index: string]: string | undefined;
  username: string;
  password: string;
  passwordConfirm?: string;
}

interface AuthState {
  [index: string]: FormState | LoginResponse | AxiosError | null;
  register: FormState;
  login: FormState;
  auth: LoginResponse | null;
  authError: AxiosError | null;
}

interface InputParams {
  form: 'register' | 'login';
  key: 'username' | 'password' | 'passwordConfirm';
  value: string;
}

interface LoginResponse {
  _id: string;
  username: string;
}

export const login = createAction(
  'auth/login',
  ({ username, password }: LoginParams) => ({
    payload: {
      username,
      password,
    },
  }),
);

export const register = createAction(
  'auth/register',
  ({ username, password }: LoginParams) => ({
    payload: {
      username,
      password,
    },
  }),
);

// 사가 생성
const loginSaga = createRequestSaga('auth/login', authAPI.login);
const registerSaga = createRequestSaga('auth/register', authAPI.register);
export function* authSaga() {
  yield takeLatest('auth/login', loginSaga);
  yield takeLatest('auth/register', registerSaga);
}

const initialState: AuthState = {
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
    changeField: (
      state,
      { payload: { form, key, value } }: PayloadAction<InputParams>,
    ) => {
      state[form][key] = value;
    },
    initializeAuth: state => {
      state['register'] = initialState['register'];
      state['login'] = initialState['login'];
      state.auth = null;
      state.authError = null;
    },
    initializeForm: (
      state,
      { payload: form }: PayloadAction<'register' | 'login'>,
    ) => {
      state[form] = initialState[form];
      state.authError = null;
    },
    loginSuccess: (
      state,
      { payload: auth }: PayloadAction<{ data: LoginResponse }>,
    ) => {
      state.auth = auth.data;
      state.authError = null;
    },
    loginFailure: (state, { payload: error }: PayloadAction<AxiosError>) => {
      console.log(error, typeof error);
      state.authError = error;
    },
    registerSuccess: (
      state,
      { payload: auth }: PayloadAction<{ data: LoginResponse }>,
    ) => {
      state.auth = auth.data;
      state.authError = null;
    },
    registerFailure: (state, { payload: error }: PayloadAction<AxiosError>) => {
      state.authError = error;
    },
  },
});

export const {
  changeField,
  initializeAuth,
  initializeForm,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
} = auth.actions;
export default auth.reducer;
