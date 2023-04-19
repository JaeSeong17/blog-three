declare module 'preset-types' {
  export type AuthFormType = 'register' | 'login';
  export type TargetSet =
    | 'start'
    | 'intro'
    | 'login'
    | 'register'
    | 'loading'
    | 'key'
    | 'board'
    | 'search'
    | 'connect'
    | 'screen';

  export type ModeSet = 'none' | 'post' | 'write';

  export type HistorySet = 'key' | 'board' | 'search';
}
