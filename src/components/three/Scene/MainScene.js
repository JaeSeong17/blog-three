import FrontContainer from '../container/FrontContainer';
import KeyContainer from '../container/KeyContainer';
import BoardContainer from '../container/BoardContainer';
import Screen from '../common/Screen';
import ConnectBoxes from '../common/ConnectBoxes';
import { useFrame } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import * as THREE from 'three';

const vec = new THREE.Vector3();
const lookAtPos = new THREE.Vector3();
const MainScene = () => {
  const camAngle = useSelector(state => state.controller.camAngle);
  const camPos = useSelector(state => state.controller.camPos);

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
      <ConnectBoxes />
      <Screen />
    </scene>
  );
};

export default MainScene;
