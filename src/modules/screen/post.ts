import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import createRequestSaga from '../../lib/createRequestSaga';
import * as postsAPI from '../../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';

interface PostState {
  post: PostResponse | null;
  error: AxiosError | null;
}

interface PostResponse {
  _id: string;
  publishedDate: string;
  tags: Array<string>;
}

export const readPost = createAction('post/readPost', id => ({
  payload: id,
}));

const readPostSaga = createRequestSaga('post/readPost', postsAPI.readPost);
export function* postSaga() {
  yield takeLatest('post/readPost', readPostSaga);
}

const post = createSlice({
  name: 'post',
  initialState: {
    post: null,
    error: null,
  } as PostState,
  reducers: {
    readPostSuccess: (
      state,
      { payload: post }: PayloadAction<{ data: PostResponse }>,
    ) => {
      state.post = post.data;
    },
    readPostFailure: (state, { payload: error }: PayloadAction<AxiosError>) => {
      state.error = error;
    },
    unloadPost: state => {
      state.post = null;
      state.error = null;
    },
  },
});

export const { readPostSuccess, readPostFailure, unloadPost } = post.actions;
export default post.reducer;
