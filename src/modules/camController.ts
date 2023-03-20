import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TargetSet } from 'preset-types';
import camSetting from 'src/static/camSetting';
import { CamControllerState } from 'root-state-types';

const camController = createSlice({
  name: 'camController',
  initialState: {
    camAngle: { x: 0, y: 0, z: 2 },
    camPos: { x: 0, y: -30, z: 3 },
    target: 'start',
  } as CamControllerState,
  reducers: {
    setTarget: (state, { payload }: PayloadAction<TargetSet>) => {
      state.target = payload;
      state.camAngle = camSetting[payload].angle;
      state.camPos = camSetting[payload].pos;
    },
  },
});

export const { setTarget } = camController.actions;
export default camController.reducer;
