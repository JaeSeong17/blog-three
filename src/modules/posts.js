import { createSlice, createAction } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const LIST_POSTS = 'posts/listPosts';
export const listPosts = createAction(
  LIST_POSTS,
  ({ tag, username, page }) => ({
    payload: {
      tag,
      username,
      page,
    },
  }),
);
const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

const posts = createSlice({
  name: 'posts',
  initialState: {
    posts: null,
    currPostUsername: null,
    currPostId: null,
    currMode: 'root',
    currTag: null,
    currPage: 1,
    lastPage: 1,
    waiting: false,
    complete: false,
    error: null,
  },
  reducers: {
    listPostsSuccess: (state, { payload: posts, meta: response }) => {
      state.posts = posts;
      state.lastPage = parseInt(response.headers['last-page'], 10);
      state.complete = true;
    },
    listPostsFailure: (state, { payload: error }) => {
      state.error = error;
    },
    setCurrPost: (state, { payload }) => {
      state.currPostUsername = payload.username;
      state.currPostId = payload.postId;
    },
    setCurrMode: (state, { payload }) => {
      state.currMode = payload;
    },
    increasePage: state => {
      state.currPage += 1;
    },
    decreasePage: state => {
      state.currPage -= 1;
    },
    loadWaiting: state => {
      state.waiting = true;
      console.log('waiting module');
    },
    loadComplete: state => {
      state.waiting = false;
      state.complete = false;
    },
    setComplete: state => {
      state.complete = true;
    },
    setCurrTag: (state, { payload }) => {
      state.currTag = payload;
    },
  },
});

export const {
  listPostsSuccess,
  listPostsFailure,
  setCurrPost,
  setCurrMode,
  increasePage,
  decreasePage,
  loadWaiting,
  loadComplete,
  setComplete,
  setCurrTag,
} = posts.actions;
export default posts.reducer;
