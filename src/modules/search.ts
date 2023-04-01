import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import {
  ListPostsResponse,
  SearchInputParams,
  SearchState,
} from 'root-state-types';
import createRequestSaga from 'src/lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';

export const searchPosts = createAction(
  'search/searchPosts',
  ({ page, keyword }: SearchInputParams) => ({
    payload: { page, keyword },
  }),
);

const searchPostsSaga = createRequestSaga(
  'search/searchPosts',
  postsAPI.searchPosts,
);

export function* searchSaga() {
  yield takeLatest('search/searchPosts', searchPostsSaga);
}

const search = createSlice({
  name: 'search',
  initialState: {
    keyword: '',
    lastPage: 1,
    currPage: 1,
    posts: null,
    waiting: false,
    complete: false,
    error: null,
  } as SearchState,
  reducers: {
    searchPostsSuccess: (
      state,
      { payload: response }: PayloadAction<ListPostsResponse>,
    ) => {
      state.posts = response.data;
      state.lastPage = parseInt(response.meta.headers['last-page'], 10);
      state.complete = true;
    },
    searchPostsFailure: (state, { payload: error }: PayloadAction<any>) => {
      state.complete = true;
      state.error = error;
    },
    setKeyword: (state, { payload: input }: PayloadAction<string>) => {
      state.keyword = input;
    },
    increasePage: state => {
      state.currPage += 1;
    },
    decreasePage: state => {
      state.currPage -= 1;
    },
    initializePage: state => {
      state.currPage = 1;
    },
    loadWaiting: state => {
      state.waiting = true;
    },
    loadComplete: state => {
      state.waiting = false;
      state.complete = false;
    },
    setComplete: state => {
      state.complete = true;
    },
  },
});

export const {
  searchPostsSuccess,
  searchPostsFailure,
  setKeyword,
  increasePage,
  decreasePage,
  initializePage,
  loadWaiting,
  loadComplete,
  setComplete,
} = search.actions;
export default search.reducer;
