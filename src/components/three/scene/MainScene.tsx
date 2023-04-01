import FrontContainer from '../container/FrontContainer';
import KeyContainer from '../container/KeyContainer';
import BoardContainer from '../container/BoardContainer';
import Screen from '../common/Screen';
import ConnectBoxes from '../common/ConnectBoxes';
import { useFrame } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { RootState } from 'root-state-types';
import SearchBoardContainer from '../container/SearchBoardContainer';

const vec = new THREE.Vector3();
const lookAtPos = new THREE.Vector3();
const MainScene = () => {
  const { camAngle, camPos } = useSelector((state: RootState) => ({
    camAngle: state.camController.camAngle,
    camPos: state.camController.camPos,
  }));

  // target 업데이트에 따른 카메라 위치 이동
  useFrame(state => {
    state.camera.position.lerp(vec.set(camPos.x, camPos.y, camPos.z), 0.015);
    lookAtPos.lerp(vec.set(camAngle.x, camAngle.y, camAngle.z), 0.015);
    state.camera.lookAt(lookAtPos);
  });

  return (
    <scene>
      <FrontContainer />
      <KeyContainer />
      <BoardContainer />
      <SearchBoardContainer />
      <ConnectBoxes />
      <Screen />
    </scene>
  );
};

export default MainScene;
