declare module 'auth-type' {
  export interface LoginParams {
    username: string;
    password: string;
  }

  export interface User {
    _id: string;
    username: string;
  }

  export interface RootUser {
    user: User | null;
    tryLogout: boolean;
  }
}
