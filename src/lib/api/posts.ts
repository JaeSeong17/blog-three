import client from './client';

interface WriteParams {
  title: string;
  body: string;
  tags: Array<string>;
}

interface ListPostsParams {
  page: number;
  username: string | null;
  tag: string | null;
}

export const writePost = ({ title, body, tags }: WriteParams) =>
  client.post('/api/posts', { title, body, tags });

export const readPost = (id: string) => client.get(`/api/posts/${id}`);

export const listPosts = ({ page, username, tag }: ListPostsParams) => {
  return client.get(`/api/posts`, {
    params: { page, username, tag },
  });
};
