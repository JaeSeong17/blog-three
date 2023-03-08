import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import camSetting from 'src/static/camSetting';

interface CamControllerState {
  camAngle: { x: number; y: number; z: number }; // 카메라가 바라보는 방향
  camPos: { x: number; y: number; z: number }; // 카메라의 위치
  target: string; // 타겟 값에 따라 카메라 위치 설정
}

const camController = createSlice({
  name: 'camController',
  initialState: {
    camAngle: { x: 0, y: 0, z: 2 },
    camPos: { x: 0, y: -30, z: 3 },
    target: 'start',
  } as CamControllerState,
  reducers: {
    setTarget: (state, { payload }: PayloadAction<string>) => {
      state.target = payload;
      state.camAngle = camSetting[payload].angle;
      state.camPos = camSetting[payload].pos;
    },
  },
});

export const { setTarget } = camController.actions;
export default camController.reducer;
