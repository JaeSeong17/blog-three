declare module 'auth-type' {
  export interface LoginParams {
    username: string;
    password: string;
  }
  export interface GoogleLoginParams {
    googleToken: string;
  }

  export interface User {
    _id: string;
    username: string;
  }
}
