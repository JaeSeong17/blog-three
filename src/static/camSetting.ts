interface CamSetting {
  [index: string]: {
    angle: { x: number; y: number; z: number };
    pos: { x: number; y: number; z: number };
  };
}

const camSetting: CamSetting = {
  start: {
    angle: { x: 0, y: 0, z: 2 },
    pos: { x: 0, y: -35, z: 3 },
  },
  intro: {
    angle: { x: 0, y: 0, z: 2 },
    pos: { x: 0, y: -30, z: 3 },
  },
  auth: {
    angle: { x: 0, y: 0, z: 2 },
    pos: { x: 0, y: -30, z: 3 },
  },
  entering: {
    angle: { x: 0, y: 0, z: 2 },
    pos: { x: 0, y: -30, z: 3 },
  },
  key: {
    angle: { x: 0, y: -0.5, z: 0 },
    pos: { x: 15, y: 0, z: 20 },
  },
  board: {
    angle: { x: 4, y: 6, z: 0 },
    pos: { x: 10, y: 6.5, z: 15 },
  },
  search: {
    angle: { x: -10, y: 14, z: 7 },
    pos: { x: -4, y: 14.5, z: 12 },
  },
  connect: {
    angle: { x: 0, y: 16, z: 5 },
    pos: { x: 10, y: 12, z: 5 },
  },
  screen: {
    angle: { x: 0, y: 30, z: 12 },
    pos: { x: 0, y: 25, z: 12 },
  },
};

export default camSetting;
