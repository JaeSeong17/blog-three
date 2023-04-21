declare module 'preset-types' {
  export type AuthFormType = 'login' | 'register' | 'verify' | 'success';

  export type TargetSet =
    | 'start'
    | 'intro'
    | 'auth'
    | 'entering'
    | 'key'
    | 'board'
    | 'search'
    | 'connect'
    | 'screen';

  export type ModeSet = 'none' | 'post' | 'write';

  export type HistorySet = 'key' | 'board' | 'search';
}
