import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import createRequestSaga from '../../lib/createRequestSaga';
import * as postsAPI from '../../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import { AxiosHeaders } from 'axios';

interface ListPostState {
  posts: Array<object> | null;
  index: number;
  currTag: string;
  currPage: number;
  lastPage: number;
  waiting: boolean;
  complete: boolean;
  error: any;
}

interface ListPostsParams {
  tag: Array<string>;
  username?: string;
  page: number;
}

interface ListPostsResponse {
  data: Array<object>;
  meta: { headers: AxiosHeaders };
}

export const listPosts = createAction(
  'boardController/listPosts',
  ({ tag, username, page }) => ({
    payload: { tag, username, page } as ListPostsParams,
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
  } as ListPostState,
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
      console.log('waiting module');
    },
    loadComplete: state => {
      state.waiting = false;
      state.complete = false;
    },
    setComplete: state => {
      state.complete = true;
    },
    setCurrTag: (state, { payload }: PayloadAction<string>) => {
      state.currTag = payload;
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
