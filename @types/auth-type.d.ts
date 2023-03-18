declare module 'auth-type' {
  import { TargetSet } from 'preset-types';
  import { AuthState } from 'root-state-types';
  import { AuthInputParams } from 'root-state-types';
  import { AuthFormType } from 'preset-types';
  import { UserState } from 'root-state-types';

  export interface LoginParams {
    username: string;
    password: string;
  }

  export interface User {
    _id: string;
    username: string;
  }

  export interface AuthBoxReducerCarrier {
    target: TargetSet;
    setTargetToKey: () => void;
    authReducerCarrier: {
      authState: AuthState;
      authLogin: (params: LoginParams) => void;
      authRegister: (params: LoginParams) => void;
      authChangeField: (params: AuthInputParams) => void;
      authInitializeForm: (params: AuthFormType) => void;
    };
    userReducerCarrier: {
      userState: UserState;
      userCheck: () => void;
      userInitialize: () => void;
    };
  }

  interface LoginReducerCarrier {
    authReducerCarrier: {
      authState: AuthState;
      authLogin: (params: LoginParams) => void;
      authChangeField: (params: AuthInputParams) => void;
      authInitializeForm: (params: AuthFormType) => void;
    };
    userReducerCarrier: {
      userState: UserState;
      userCheck: () => void;
      userInitialize: () => void;
    };
    setTargetToKey: () => void;
  }

  export interface RegisterReducerCarrier {
    authReducerCarrier: {
      authState: AuthState;
      authRegister: (params: LoginParams) => void;
      authChangeField: (params: AuthInputParams) => void;
      authInitializeForm: (params: AuthFormType) => void;
    };
    userReducerCarrier: {
      userState: UserState;
      userCheck: () => void;
      userInitialize: () => void;
    };
    setTargetToKey: () => void;
  }
}
