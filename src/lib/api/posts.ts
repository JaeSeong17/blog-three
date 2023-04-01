import { ListPostsParams, SearchInputParams } from 'root-state-types';
import {
  UpdateRequestParams,
  WriteRequestParams,
  WriteCommentRequestParams,
  UpdateCommentRequestParams,
} from 'screen-state-types';
import client from './client';

export const writePost = ({ title, body, tags }: WriteRequestParams) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = (id: string) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }: ListPostsParams) => {
  return client.get(`/api/posts`, {
    params: { page, username, tag },
  });
};

export const updatePost = ({ id, title, body, tags }: UpdateRequestParams) =>
  client.patch(`/api/posts/${id}`, { title, body, tags });

export const removePost = (id: string) => client.delete(`api/posts/${id}`);

export const searchPosts = ({ page, keyword }: SearchInputParams) => {
  return client.get(`api/posts/searchPosts`, {
    params: { page, keyword },
  });
};

export const writeComment = ({ postId, body }: WriteCommentRequestParams) =>
  client.post('/api/posts/comment', { postId, body });

export const removeComment = (commentId: string) =>
  client.delete(`/api/posts/comment/${commentId}`);

export const updateComment = ({
  commentId,
  body,
}: UpdateCommentRequestParams) =>
  client.patch(`/api/posts/comment/${commentId}`, { body });
