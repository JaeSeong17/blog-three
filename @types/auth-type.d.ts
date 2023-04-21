declare module 'auth-type' {
  export interface LoginParams {
    email: string;
    password: string;
  }

  export interface RegisterParams extends LoginParams {
    username: string;
  }

  export interface VerifyParams {
    email: string;
    code: string;
  }

  export interface GoogleLoginParams {
    googleToken: string;
  }

  export interface User {
    _id: string;
    username: string;
    email: string;
  }
}
