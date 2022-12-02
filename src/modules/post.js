import { createSlice, createAction } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const READ_POST = 'post/readPost';

export const readPost = createAction(READ_POST, ( id ) => ({
    payload: id 
}));

const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
export function* postSaga() {
    yield takeLatest(READ_POST, readPostSaga);
}

const post = createSlice({
    name: 'post',
    initialState: {
        post: null,
        error: null,
    },
    reducers: {
        readPostSuccess: (state, { payload: post }) => {
            state.post = post;
        },
        readPostFailure: (state, { payload: error }) => {
            state.error = error;
        },
        unloadPost: (state, action) => {
            state.post = null;
            state.error = null;
        }
    }
})

export const {
    readPostSuccess,
    readPostFailure,
    unloadPost
} = post.actions;
export default post.reducer;