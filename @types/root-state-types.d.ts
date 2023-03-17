declare module 'root-state-types' {
  import { PostResponse } from 'screen-state-types';
  import { ModeSet, TargetSet } from 'preset-types';
  import { AxiosHeaders } from 'axios';
  import { LoadingState } from 'loading-state-types';
  import { User } from 'auth-type';
  import { AxiosError } from 'axios';

  export interface RootState {
    boardController: BoardControllerState;
    camController: CamControllerState;
    screenController: ScreenControllerState;
    auth: AuthState;
    user: UserState;
    loading: LoadingState;
  }

  export interface BoardControllerState {
    posts: Array<PostResponse> | null;
    index: number;
    currTag: string | null;
    currPage: number;
    lastPage: number;
    waiting: boolean;
    complete: boolean;
    error: any;
  }

  export interface ListPostsParams {
    tag: string | null;
    username?: string;
    page: number;
  }

  export interface ListPostsResponse {
    data: Array<PostResponse>;
    meta: { headers: AxiosHeaders };
  }

  export interface CamControllerState {
    camAngle: { x: number; y: number; z: number }; // 카메라가 바라보는 방향
    camPos: { x: number; y: number; z: number }; // 카메라의 위치
    target: TargetSet; // 타겟 값에 따라 카메라 위치 설정
  }

  export interface ScreenControllerState {
    currPostUsername: string | null;
    currPostId: string | null;
    currMode: ModeSet;
  }

  export interface CurrPostParams {
    username: string;
    postId: string;
  }

  export interface AuthState {
    [index: string]: FormState | User | AxiosError | null;
    register: FormState;
    login: FormState;
    auth: User | null;
    authError: AxiosError | null;
  }

  export interface FormState {
    [index: string]: string | undefined;
    username: string;
    password: string;
    passwordConfirm?: string;
  }

  interface AuthInputParams {
    form: 'register' | 'login';
    key: 'username' | 'password' | 'passwordConfirm';
    value: string;
  }

  export interface UserState {
    user: User | null;
    checkError: AxiosError | null;
  }
}
