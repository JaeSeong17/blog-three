declare module 'root-state-types' {
  import { TargetSet } from 'preset-types';
  import { AxiosHeaders } from 'axios';
  import { LoadingState } from 'loading-state-types';
  export interface RootState {
    boardController: BoardControllerState;
    camController: CamControllerState;
    screenController: ScreenControllerState;
    user: RootUserState;
    loading: LoadingState;
  }

  export interface BoardControllerState {
    posts: Array<object> | null;
    index: number;
    currTag: string;
    currPage: number;
    lastPage: number;
    waiting: boolean;
    complete: boolean;
    error: any;
  }

  export interface ListPostsParams {
    tag: Array<string>;
    username?: string;
    page: number;
  }

  export interface ListPostsResponse {
    data: Array<object>;
    meta: { headers: AxiosHeaders };
  }

  export interface CamControllerState {
    camAngle: { x: number; y: number; z: number }; // 카메라가 바라보는 방향
    camPos: { x: number; y: number; z: number }; // 카메라의 위치
    target: TargetSet; // 타겟 값에 따라 카메라 위치 설정
  }

  export interface ScreenControllerState {
    currPostUsername: string | null;
    currPostId: string | null;
    currMode: string;
  }

  export interface CurrPostParams {
    username: string;
    postId: string;
  }

  export interface RootUserState {
    user: string | null;
    tryLogout: boolean;
  }
}
