declare module 'root-state-types' {
  import { WriteState, PostState, Post } from 'screen-state-types';
  import { AuthFormType, HistorySet, ModeSet, TargetSet } from 'preset-types';
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
    write: WriteState;
    post: PostState;
    search: SearchState;
    loading: LoadingState;
  }

  export interface BoardControllerState {
    posts: Array<Post> | null;
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
    data: Array<Post>;
    meta: { headers: AxiosHeaders };
  }

  export interface CamControllerState {
    camAngle: { x: number; y: number; z: number }; // 카메라가 바라보는 방향
    camPos: { x: number; y: number; z: number }; // 카메라의 위치
    target: TargetSet; // 타겟 값에 따라 카메라 위치 설정
    history: HistorySet; // 스크린을 닫았을 때 돌아올 위치
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
    [index: string]:
      | LoginFormState
      | VerifyFormState
      | User
      | AxiosError
      | boolean
      | null;
    register: RegisterFormState;
    login: LoginFormState;
    verify: VerifyFormState;
    loginRequested: boolean;
    verification: boolean;
    auth: User | null;
    authError: AxiosError | null;
  }

  export interface LoginFormState {
    [index: string]: string | undefined;
    email: string;
    password: string;
  }

  export interface RegisterFormState extends LoginFormState {
    username: string;
    passwordConfirm: string;
  }

  export interface VerifyFormState {
    code: string;
  }

  export interface AuthInputParams {
    form: AuthFormType;
    key: 'email' | 'username' | 'password' | 'passwordConfirm' | 'code';
    value: string;
  }

  export interface UserState {
    user: User | null;
    checkError: AxiosError | null;
  }

  export interface SearchInputParams {
    page: number;
    keyword: string;
  }

  export interface SearchState {
    keyword: string;
    lastPage: number;
    currPage: number;
    posts: Array<Post> | null;
    waiting: boolean;
    complete: boolean;
    error: AxiosError | null;
  }
}
