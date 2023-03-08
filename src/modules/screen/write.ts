import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import createRequestSaga from '../../lib/createRequestSaga';
import * as postsAPI from '../../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';

interface WriteState {
  [index: string]: any;
  title: string;
  body: string;
  tags: Array<string>;
  post: any;
  postError: AxiosError | null;
}

interface InputParams {
  key: 'title' | 'body' | 'tags';
  value: string | Array<string>;
}

interface WriteResponse {
  body: string;
  publishedDate: string;
  tags: Array<string>;
  title: string;
  user: {
    _id: string; // 계정 고유 넘버링
    username: string;
  };
  __v: number;
  _id: string; // 글 고유 넘버링
}

// 사가 생성
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
    writePost: state => {
      state.post = null;
      state.postError = null;
    },
    writePostSuccess: (
      state,
      { payload: post }: PayloadAction<{ data: WriteResponse }>,
    ) => {
      state.post = post.data;
    },
    writePostFailure: (
      state,
      { payload: postError }: PayloadAction<AxiosError>,
    ) => {
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
