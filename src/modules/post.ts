import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import createRequestSaga from 'src/lib/createRequestSaga';
import * as postsAPI from 'src/lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  PostState,
  PostResponse,
  WriteCommentRequestParams,
  Comment,
  UpdateCommentRequestParams,
} from 'screen-state-types';

export const readPost = createAction('post/readPost', (id: string) => ({
  payload: id,
}));
export const writeComment = createAction(
  'post/writeComment',
  ({ postId, body }: WriteCommentRequestParams) => ({
    payload: { postId, body },
  }),
);
export const removeComment = createAction(
  'post/removeComment',
  (id: string) => ({
    payload: id,
  }),
);
export const updateComment = createAction(
  'post/updateComment',
  ({ commentId, body }: UpdateCommentRequestParams) => ({
    payload: { commentId, body },
  }),
);
const readPostSaga = createRequestSaga('post/readPost', postsAPI.readPost);
const writeCommentSaga = createRequestSaga(
  'post/writeComment',
  postsAPI.writeComment,
);
const removeCommentSaga = createRequestSaga(
  'post/removeComment',
  postsAPI.removeComment,
);
const updateCommentSaga = createRequestSaga(
  'post/updateComment',
  postsAPI.updateComment,
);
export function* postSaga() {
  yield takeLatest('post/readPost', readPostSaga);
  yield takeLatest('post/writeComment', writeCommentSaga);
  yield takeLatest('post/removeComment', removeCommentSaga);
  yield takeLatest('post/updateComment', updateCommentSaga);
}

const post = createSlice({
  name: 'post',
  initialState: {
    post: null,
    comments: [],
    error: null,
  } as PostState,
  reducers: {
    readPostSuccess: (
      state,
      { payload: response }: PayloadAction<{ data: PostResponse }>,
    ) => {
      state.post = response.data.post;
      state.comments = response.data.comments;
      state.error = null;
    },
    readPostFailure: (state, { payload: error }: PayloadAction<AxiosError>) => {
      state.error = error;
    },
    writeCommentSuccess: (
      state,
      { payload: response }: PayloadAction<{ data: Array<Comment> }>,
    ) => {
      state.comments = response.data;
      state.error = null;
    },
    writeCommentFailure: (
      state,
      { payload: error }: PayloadAction<AxiosError>,
    ) => {
      state.error = error;
    },
    removeCommentSuccess: (
      state,
      { payload: response }: PayloadAction<{ data: Array<Comment> }>,
    ) => {
      state.comments = response.data;
      state.error = null;
    },
    removeCommentFailure: (
      state,
      { payload: error }: PayloadAction<AxiosError>,
    ) => {
      state.error = error;
    },
    updateCommentSuccess: (
      state,
      { payload: response }: PayloadAction<{ data: Array<Comment> }>,
    ) => {
      state.comments = response.data;
      state.error = null;
    },
    updateCommentFailure: (
      state,
      { payload: error }: PayloadAction<AxiosError>,
    ) => {
      state.error = error;
    },
    unloadPost: state => {
      state.post = null;
      state.comments = [];
      state.error = null;
    },
  },
});

export const {
  readPostSuccess,
  readPostFailure,
  writeCommentSuccess,
  writeCommentFailure,
  removeCommentSuccess,
  removeCommentFailure,
  updateCommentSuccess,
  updateCommentFailure,
  unloadPost,
} = post.actions;
export default post.reducer;
