declare module 'screen-state-types' {
  import { AxiosError } from 'axios';
  export interface PostState {
    post: PostResponse | null;
    error: AxiosError | null;
  }

  export interface PostResponse {
    _id: string;
    publishedDate: string;
    tags: Array<string>;
  }

  export interface WriteState {
    [index: string]: any;
    title: string;
    body: string;
    tags: Array<string>;
    post: any;
    postError: AxiosError | null;
  }

  interface InputParams {
    key: 'title' | 'body' | 'tags';
    value: string | Array<string>;
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
