declare module 'reducer-carrier-types' {
  import { ModeSet, TargetSet } from 'preset-types';
  import {
    AuthState,
    CurrPostParams,
    ScreenControllerState,
  } from 'root-state-types';
  import { AuthInputParams } from 'root-state-types';
  import { AuthFormType } from 'preset-types';
  import { UserState } from 'root-state-types';
  import {
    GoogleLoginParams,
    LoginParams,
    RegisterParams,
    User,
    VerifyParams,
  } from 'auth-type';
  import { LoadingState } from 'loading-state-types';
  import {
    WriteState,
    PostState,
    WriteInputParams,
    WriteRequestParams,
    UpdateRequestParams,
    Post,
    WriteCommentRequestParams,
    UpdateCommentRequestParams,
  } from 'screen-state-types';

  // AuthBox 내부로 리듀서 전달을 위한 캐리어 타입
  export interface AuthReducerCarrier {
    authState: AuthState;
    authLogin: (params: LoginParams) => void;
    authGoogleLogin: (params: GoogleLoginParams) => void;
    authRegister: (params: RegisterParams) => void;
    authVerify: (params: VerifyParams) => void;
    authChangeField: (params: AuthInputParams) => void;
    authInitializeForm: (param: AuthFormType) => void;
    authInitializeAuth: () => void;
  }

  export interface UserReducerCarrier {
    userState: UserState;
    userCheck: () => void;
    userInitialize: () => void;
  }

  export interface AuthBoxReducerCarrier {
    enterHandler: () => void;
    authReducerCarrier: AuthReducerCarrier;
    userReducerCarrier: UserReducerCarrier;
    loadingReducerCarrier: LoadingReducerCarrier;
  }

  export interface FormReducerCarrier {
    authReducerCarrier: AuthReducerCarrier;
    userReducerCarrier: UserReducerCarrier;
    loadingReducerCarrier: LoadingReducerCarrier;
    enterHandler: () => void;
    setType: React.Dispatch<React.SetStateAction<AuthFormType>>;
  }

  // Screen 내부로 리듀서 전달을 위한 캐리어 타입
  interface CamReducerCarrier {
    setTarget: (param: TargetSet) => void;
  }
  interface SCReducerCarrier {
    scState: ScreenControllerState;
    setCurrPost: (params: CurrPostParams) => void;
    setCurrMode: (params: ModeSet) => void;
  }
  interface PostReducerCarrier {
    postState: PostState;
    readPost: (param: string) => void;
    writeComment: (params: WriteCommentRequestParams) => void;
    removeComment: (param: string) => void;
    updateComment: (params: UpdateCommentRequestParams) => void;
    unloadPost: () => void;
  }
  interface WriteReducerCarrier {
    writeState: WriteState;
    changeField: (params: WriteInputParams) => void;
    initialize: () => void;
    writePost: (params: WriteRequestParams) => void;
    updatePost: (params: UpdateRequestParams) => void;
    setOriginalPost: (params: Post) => void;
  }
  interface LoadingReducerCarrier {
    loadingState: LoadingState;
  }

  export interface ScreenHtmlParams {
    user: User | null;
    camReducerCarrier: CamReducerCarrier;
    scReducerCarrier: SCReducerCarrier;
    writeReducerCarrier: WriteReducerCarrier;
    postReducerCarrier: PostReducerCarrier;
    loadingReducerCarrier: LoadingReducerCarrier;
  }

  export interface PostPageParams {
    user: User | null;
    camReducerCarrier: CamReducerCarrier;
    scReducerCarrier: SCReducerCarrier;
    postReducerCarrier: PostReducerCarrier;
    writeReducerCarrier: WriteReducerCarrier;
    loadingReducerCarrier: LoadingReducerCarrier;
  }

  export interface WritePageParams {
    scReducerCarrier: SCReducerCarrier;
    writeReducerCarrier: WriteReducerCarrier;
  }
}
