declare module 'screen-state-types' {
  import { LoadingState } from 'loading-state-types';
  import { AxiosError } from 'axios';
  import { User } from 'auth-type';
  export interface ScreenState {
    write: WriteState;
    post: PostState;
    loading: LoadingState;
  }

  export interface PostState {
    post: Post | null;
    comments: Array<Comment>;
    error: AxiosError | null;
  }

  export interface Post {
    user: User;
    _id: string;
    title: string;
    body: string;
    publishedDate: string;
    tags: Array<string>;
  }

  export interface Comment {
    _id: string;
    user: User;
    body: string;
    publishedDate: Date;
  }

  export interface WriteCommentRequestParams {
    postId: string;
    body: string;
  }

  export interface UpdateCommentRequestParams {
    commentId: string;
    body: string;
  }

  export interface PostResponse {
    post: Post;
    comments: Array<Comment>;
  }

  export interface WriteState {
    [index: string]: any;
    title: string;
    body: string;
    tags: Array<string>;
    post: Post | null;
    postError: AxiosError | null;
    originalPostId: string | null;
  }

  interface WriteInputParams {
    key: 'title' | 'body' | 'tags';
    value: string | Array<string>;
  }

  interface WriteRequestParams {
    title: string;
    body: string;
    tags: Array<string>;
  }

  interface UpdateRequestParams extends WriteRequestParams {
    id: string;
  }

  interface WriteResponse {
    body: string;
    publishedDate: string;
    tags: Array<string>;
    title: string;
    user: User;
    __v: number;
    _id: string; // 글 고유 넘버링
  }
}
