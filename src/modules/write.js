import { createSlice } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

// 사가 생성
const WRITE_POST = 'write/writePost';
const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
}

const write = createSlice({
  name: 'write',
  initialState: {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
  },
  reducers: {
    initialize: (state, action) => {
      state.title = '';
      state.body = '';
      state.tags = [];
      state.post = null;
      state.postError = null;
    },
    changeField: (state, { payload: { key, value } }) => {
      state[key] = value;
    },
    writePost: (state, action) => {
      state.post = null;
      state.postError = null;
    },
    writePostSuccess: (state, { payload: post }) => {
      state.post = post;
    },
    writePostFailure: (state, { payload: postError }) => {
      state.postError = postError;
    },
  },
});

export const {
  initialize,
  changeField,
  writePost,
  writePostSuccess,
  writePostFailure,
} = write.actions;
export default write.reducer;
