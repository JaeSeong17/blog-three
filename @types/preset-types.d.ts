declare module 'preset-types' {
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
