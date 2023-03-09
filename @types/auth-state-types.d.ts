declare module 'auth-state-types' {
  import { User } from 'auth-type';
  import { AxiosError } from 'axios';
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
