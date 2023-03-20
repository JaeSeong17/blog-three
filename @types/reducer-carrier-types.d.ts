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
  import { LoginParams, User } from 'auth-type';
  import { LoadingState } from 'loading-state-types';
  import {
    WriteState,
    PostState,
    WriteInputParams,
    WriteRequestParams,
    PostResponse,
    UpdateRequestParams,
  } from 'screen-state-types';

  // AuthBox 내부로 리듀서 전달을 위한 캐리어 타입
  export interface AuthReducerCarrier {
    authState: AuthState;
    authLogin: (params: LoginParams) => void;
    authRegister: (params: LoginParams) => void;
    authChangeField: (params: AuthInputParams) => void;
    authInitializeForm: (params: AuthFormType) => void;
  }

  export interface UserReducerCarrier {
    userState: UserState;
    userCheck: () => void;
    userInitialize: () => void;
  }

  export interface AuthBoxReducerCarrier {
    target: TargetSet;
    setTargetToKey: () => void;
    authReducerCarrier: AuthReducerCarrier;
    userReducerCarrier: UserReducerCarrier;
  }

  export interface FormReducerCarrier<T extends AuthFormType> {
    authReducerCarrier: T extends 'login'
      ? Omit<AuthReducerCarrier, 'authRegister'>
      : Omit<AuthReducerCarrier, 'authLogin'>;
    userReducerCarrier: UserReducerCarrier;
    setTargetToKey: () => void;
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
    unloadPost: () => void;
  }
  interface WriteReducerCarrier {
    writeState: WriteState;
    changeField: (params: WriteInputParams) => void;
    initialize: () => void;
    writePost: (params: WriteRequestParams) => void;
    updatePost: (params: UpdateRequestParams) => void;
    setOriginalPost: (params: PostResponse) => void;
  }
  interface LoadingReducerCarrier {
    loadingState: LoadingState;
  }

  export interface ScreenReducerCarrier {
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
