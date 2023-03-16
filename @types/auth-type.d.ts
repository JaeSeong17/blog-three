declare module 'auth-type' {
  import { RootUserState } from 'root-state-types';
  import { TargetSet } from 'preset-types';
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
}
