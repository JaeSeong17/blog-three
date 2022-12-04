import { createSlice, createAction } from "@reduxjs/toolkit";
import createRequestSaga from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const LIST_POSTS = 'posts/listPosts';
export const listPosts = createAction(LIST_POSTS, ( tags, username, page ) => ({
    payload: {
        tags,
        username,
        page
    }
}));
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
        error: null,
    },
    reducers: {
        listPostsSuccess: (state, { payload: posts }) => {
            state.posts = posts;
        },
        listPostsFailure: (state, { payload: error }) => {
            state.error = error;
        },
        setCurrPost: (state, { payload }) => {
            state.currPostUsername = payload.username;
            state.currPostId = payload.postId;
        }
    }
});

export const {
    listPostsSuccess,
    listPostsFailure,
    setCurrPost
} = posts.actions;
export default posts.reducer;