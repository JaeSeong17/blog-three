import FrontContainer from '../container/FrontContainer';
import KeyContainer from '../container/KeyContainer';
import BoardContainer from '../container/BoardContainer';
import Screen from '../common/Screen';
import ConnectBoxes from '../common/ConnectBoxes';
import { useThree } from '@react-three/fiber';
import { useSelector } from 'react-redux';
import { Vector3, Quaternion, Matrix4 } from 'three';
import { RootState } from 'root-state-types';
import SearchBoardContainer from '../container/SearchBoardContainer';
import { Suspense, useEffect } from 'react';
import gsap from 'gsap';

const MainScene = () => {
  const { target, camAngle, camPos } = useSelector(
    ({ camController }: RootState) => ({
      target: camController.target,
      camAngle: camController.camAngle,
      camPos: camController.camPos,
    }),
  );
  const { camera } = useThree(); // Three.js의 핵심 객체 state hook
  const camPosVec = new Vector3(camPos.x, camPos.y, camPos.z);
  const tarPosVec = new Vector3(camAngle.x, camAngle.y, camAngle.z);

  // target 업데이트에 따른 카메라 위치 이동
  useEffect(() => {
    // 카메라 위치 이동
    gsap.to(camera.position, {
      x: camPosVec.x,
      y: camPosVec.y,
      z: camPosVec.z,
      ease: 'power3.out',
      duration: 3,
    });

    // 카메라 회전을 위한 quarternion 계산
    const cameraQuaternion = new Quaternion();
    const upDirection = new Vector3(0, 0, 1); // 카메라 상단 방향
    const cameraRotationMatrix = new Matrix4().lookAt(
      camPosVec,
      tarPosVec,
      upDirection,
    ); // 카메라위치 좌표, 바라볼 좌표, 카메라 상단 방향으로 바라보는 각도 계산
    cameraQuaternion.setFromRotationMatrix(cameraRotationMatrix); // quarternion 변환
    cameraQuaternion.normalize(); // 정규화

    // 카메라 회전
    gsap.to(camera.quaternion, {
      x: cameraQuaternion.x,
      y: cameraQuaternion.y,
      z: cameraQuaternion.z,
      w: cameraQuaternion.w,
      ease: 'power3.out',
      duration: 3,
    });
  }, [target]);

  return (
    <scene>
      <FrontContainer />
      <Suspense>
        <KeyContainer />
        <BoardContainer />
        <SearchBoardContainer />
        <ConnectBoxes />
      </Suspense>
      <Screen />
    </scene>
  );
};

export default MainScene;
