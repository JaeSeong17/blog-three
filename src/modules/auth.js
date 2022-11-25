import { createSlice, createAction } from '@reduxjs/toolkit'
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const LOGIN = 'auth/login';
// 사가 생성
export const login = createAction(LOGIN, ({ username, password }) => ({
    payload: {
        username,
        password
    }
}));
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
    yield takeLatest(LOGIN, loginSaga);
}

const auth = createSlice({
    name:"auth",
    initialState: {
        username: '',
        password: '',
        auth: null,
        authError: null,
    },
    reducers: {
        changeField: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
        initializeForm: (state, action) => {
            state.username = '';
            state.password = '';
        },
        loginSuccess: (state, { payload: auth }) => {
            state.auth = auth;
            state.authError = null;
        },
        loginFailure: (state, { payload: error }) => {
            state.authError = error;
        }
    }
});

export const { 
    changeField,
    initializeForm,
    loginSuccess,
    loginFailure,
} = auth.actions
export default auth.reducer;