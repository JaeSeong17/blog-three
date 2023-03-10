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
    post: PostResponse | null;
    error: AxiosError | null;
  }

  export interface PostResponse {
    user: User;
    _id: string;
    title: string;
    body: string;
    publishedDate: string;
    tags: Array<string>;
  }

  export interface WriteState {
    [index: string]: any;
    title: string;
    body: string;
    tags: Array<string>;
    post: PostResponse | null;
    postError: AxiosError | null;
  }

  interface InputParams {
    key: 'title' | 'body' | 'tags';
    value: string | Array<string>;
  }

  interface WriteParams {
    title: string;
    body: string;
    tags: Array<string>;
  }

  interface WriteResponse {
    body: string;
    publishedDate: string;
    tags: Array<string>;
    title: string;
    user: {
      _id: string; // 계정 고유 넘버링
      username: string;
    };
    __v: number;
    _id: string; // 글 고유 넘버링
  }
}
