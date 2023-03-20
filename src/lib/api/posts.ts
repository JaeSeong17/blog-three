import { UpdateRequestParams, WriteRequestParams } from 'screen-state-types';
import client from './client';

interface ListPostsParams {
  page: number;
  username: string | null;
  tag: string | null;
}

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
