declare module 'auth-type' {
  import { RootUserState } from 'root-state-types';
  import { TargetSet } from 'preset-types';
  import { AuthState } from 'cert-state-types';
  import { AuthInputParams } from 'cert-state-types';
  import { AuthFormType } from 'preset-types';
  import { UserState } from 'cert-state-types';

  export interface LoginParams {
    username: string;
    password: string;
  }

  export interface User {
    _id: string;
    username: string;
  }

  export interface RootAuthCarrier {
    target: TargetSet;
    rootUser: RootUserState;
    initRootUser: () => void;
    updateRootUser: (user: string) => void;
    setTargetToKey: () => void;
  }

  export interface AuthCarrier {
    target: TargetSet;
    setTargetToKey: () => void;
    authStateCarrier: AuthState;
    authReducerCarrier: {
      authLogin: (params: LoginParams) => void;
      authRegister: (params: LoginParams) => void;
      authChangeField: (params: AuthInputParams) => void;
      authInitializeForm: (params: AuthFormType) => void;
    };
    userReducerCarrier: {
      userCheck: () => void;
      userInitialize: () => void;
    };
    userStateCarrier: UserState;
  }
}
