import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import createRequestSaga from '../../lib/createRequestSaga';
import * as postsAPI from '../../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  WriteState,
  InputParams,
  WriteResponse,
  WriteParams,
} from 'screen-state-types';

export const writePost = createAction(
  'write/writePost',
  ({ title, body, tags }: WriteParams) => ({
    payload: { title, body, tags },
  }),
);

const writePostSaga = createRequestSaga('write/writePost', postsAPI.writePost);
export function* writeSaga() {
  yield takeLatest('write/writePost', writePostSaga);
}

const write = createSlice({
  name: 'write',
  initialState: {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
  } as WriteState,
  reducers: {
    initialize: state => {
      state.title = '';
      state.body = '';
      state.tags = [];
      state.post = null;
      state.postError = null;
    },
    changeField: (
      state,
      { payload: { key, value } }: PayloadAction<InputParams>,
    ) => {
      if (key === 'tags') {
        state[key] = value as Array<string>;
      } else {
        state[key] = value as string;
      }
    },
    writePostSuccess: (
      state,
      { payload: post }: PayloadAction<{ data: WriteResponse }>,
    ) => {
      state.post = post.data;
      state.postError = null;
    },
    writePostFailure: (
      state,
      { payload: postError }: PayloadAction<AxiosError>,
    ) => {
      state.postError = postError;
    },
  },
});

export const { initialize, changeField, writePostSuccess, writePostFailure } =
  write.actions;
export default write.reducer;
