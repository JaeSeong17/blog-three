declare module 'preset-types' {
  export type AuthFormType = 'register' | 'login';
  export type TargetSet =
    | 'start'
    | 'login'
    | 'register'
    | 'loading'
    | 'key'
    | 'board'
    | 'connect'
    | 'screen';

  export type ModeSet = 'none' | 'post' | 'write';
}
