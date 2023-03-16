import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setTarget } from '../../../modules/root/camController';
import { rootLogout } from '../../../modules/root/user';
import { Text3dTemplate } from './Text3DTemplate';
import { RootState } from 'root-state-types';
import { Group } from 'three';
import { clickAnim } from '../anim/CommonAnim';
import { ThreeEvent } from '@react-three/fiber';
import { logBtnOnAnim, logBtnOffAnim } from '../anim/SubObjectAnim';
import { Mesh } from 'three';

const LogButton = () => {
  const dispatch = useDispatch();
  const gltf = useLoader(GLTFLoader, 'model/keycap.glb');
  const cube = gltf.scene.children.find(child => child.name === 'Cube') as Mesh;
  const user = useSelector((state: RootState) => state.user.user);
  const target = useSelector((state: RootState) => state.camController.target);
  const ref = useRef<Group>(null);
  const onTarget = ['key', 'board', 'connect', 'screen'];

  // 클릭 이벤트 핸들러
  function logBtnClickHandler(e: ThreeEvent<MouseEvent>) {
    console.log(gltf);
    e.stopPropagation();
    if (user) {
      dispatch(rootLogout());
    }
    clickAnim(ref);
    dispatch(setTarget('login'));
  }

  // 로그인/아웃 버튼 On/Off 애니메이션 컨트롤
  useEffect(() => {
    if (ref.current) {
      if (onTarget.includes(target)) {
        logBtnOnAnim(ref.current);
      } else {
        logBtnOffAnim(ref.current);
      }
    }
  }, [target, ref]);

  return (
    <group ref={ref} onClick={logBtnClickHandler}>
      <mesh
        receiveShadow
        castShadow
        position={[0, 2, -0.1]}
        scale={0.8}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={cube.geometry}>
        <meshStandardMaterial
          color="rgba(255, 255, 255, 1)"
          roughness={0}
          metalness={0.8}
          emissive={'#ff0000'}
        />
      </mesh>
      <Text3dTemplate
        innerText={`${user ? '로그아웃' : '로그인'}`}
        position={[0.3, 3, -1]}
        rotation={[0, 0, Math.PI / 2]}
        size={0.8}
        height={0.02}
        bevelSize={0.04}
        letterSpacing={-0.06}
      />
    </group>
  );
};

export default LogButton;
