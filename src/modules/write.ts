import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  WriteState,
  WriteInputParams,
  WriteResponse,
  WriteRequestParams,
  UpdateRequestParams,
  Post,
} from 'screen-state-types';

export const writePost = createAction(
  'write/writePost',
  ({ title, body, tags }: WriteRequestParams) => ({
    payload: { title, body, tags },
  }),
);
export const updatePost = createAction(
  'write/updatePost',
  ({ id, title, body, tags }: UpdateRequestParams) => ({
    payload: { id, title, body, tags },
  }),
);

const writePostSaga = createRequestSaga('write/writePost', postsAPI.writePost);
const updatePostSaga = createRequestSaga(
  'write/updatePost',
  postsAPI.updatePost,
);
export function* writeSaga() {
  yield takeLatest('write/writePost', writePostSaga);
  yield takeLatest('write/updatePost', updatePostSaga);
}

const write = createSlice({
  name: 'write',
  initialState: {
    title: '',
    body: '',
    tags: [],
    post: null,
    postError: null,
    originalPostId: null,
  } as WriteState,
  reducers: {
    initialize: state => {
      state.title = '';
      state.body = '';
      state.tags = [];
      state.post = null;
      state.postError = null;
      state.originalPostId = null;
    },
    changeField: (
      state,
      { payload: { key, value } }: PayloadAction<WriteInputParams>,
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
    updatePostSuccess: (
      state,
      { payload: post }: PayloadAction<{ data: WriteResponse }>,
    ) => {
      state.post = post.data;
      state.postError = null;
    },
    updatePostFailure: (
      state,
      { payload: postError }: PayloadAction<AxiosError>,
    ) => {
      state.postError = postError;
    },
    setOriginalPost: (state, { payload: post }: PayloadAction<Post>) => {
      state.title = post.title;
      state.body = post.body;
      state.tags = post.tags;
      state.originalPostId = post._id;
    },
  },
});

export const {
  initialize,
  changeField,
  writePostSuccess,
  writePostFailure,
  updatePostSuccess,
  updatePostFailure,
  setOriginalPost,
} = write.actions;
export default write.reducer;
