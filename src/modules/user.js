import { createSlice, createAction } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const CHECK = 'user/check';
// 사가 생성
export const check = createAction(CHECK);
const checkSaga = createRequestSaga(CHECK, authAPI.check);
export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
}

const user = createSlice({
    name:"user",
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
        }
        
    }
});

export const { 
    tempSetUser,
    checkSuccess,
    checkFailure,
} = user.actions
export default user.reducer;