import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import createRequestSaga from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import {
  BoardControllerState,
  ListPostsParams,
  ListPostsResponse,
} from 'root-state-types';

export const listPosts = createAction(
  'boardController/listPosts',
  ({ page, tag, username }: ListPostsParams) => ({
    payload: { tag, username, page },
  }),
);

const listPostsSaga = createRequestSaga(
  'boardController/listPosts',
  postsAPI.listPosts,
);

export function* postsSaga() {
  yield takeLatest('boardController/listPosts', listPostsSaga);
}

const boardController = createSlice({
  name: 'boardController',
  initialState: {
    posts: null,
    index: -1,
    currTag: 'Total',
    currPage: 1,
    lastPage: 1,
    waiting: false,
    complete: false,
    error: null,
  } as BoardControllerState,
  reducers: {
    listPostsSuccess: (
      state,
      { payload: response }: PayloadAction<ListPostsResponse>,
    ) => {
      state.posts = response.data;
      state.lastPage = parseInt(response.meta.headers['last-page'], 10);
      state.complete = true;
    },
    listPostsFailure: (state, { payload: error }: PayloadAction<any>) => {
      state.error = error;
    },
    setIndex: (state, { payload }: PayloadAction<number>) => {
      state.index = payload;
    },
    increasePage: state => {
      state.currPage += 1;
    },
    decreasePage: state => {
      state.currPage -= 1;
    },
    loadWaiting: state => {
      state.waiting = true;
      console.log('waiting new posts list');
    },
    loadComplete: state => {
      state.waiting = false;
      state.complete = false;
    },
    setComplete: state => {
      state.complete = true;
    },
    setCurrTag: (state, { payload }: PayloadAction<string>) => {
      state.currTag = payload === 'Total' ? null : payload;
    },
  },
});

export const {
  listPostsSuccess,
  listPostsFailure,
  setIndex,
  increasePage,
  decreasePage,
  loadWaiting,
  loadComplete,
  setComplete,
  setCurrTag,
} = boardController.actions;
export default boardController.reducer;
