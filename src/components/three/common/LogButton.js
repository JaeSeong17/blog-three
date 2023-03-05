import * as THREE from 'three';
import { useGLTF, Text3D } from '@react-three/drei';
import gsap from 'gsap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { setTarget } from '../../../modules/root/controller';
import { rootLogout } from '../../../modules/root/user';

const material = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#fafafa').convertSRGBToLinear(),
  roughness: 0,
  metalness: 0.8,
  emissive: new THREE.Color('#ff0000').convertSRGBToLinear(),
});

const LogButton = () => {
  const { nodes } = useGLTF('/keycap.glb');
  const user = useSelector(state => state.user.user);
  const target = useSelector(state => state.controller.target);
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const onTarget = ['key', 'board', 'connect', 'screen'];
    if (onTarget.includes(target)) {
      gsap.to(ref.current.position, {
        z: 1,
        delay: 4,
        duration: 1.2,
      });
    } else {
      gsap.to(ref.current.position, {
        z: -3,
        duration: 1.2,
      });
    }
  }, [target]);

  function clickAnimation() {
    gsap.to(ref.current.position, {
      z: '-=0.1',
      duration: 0.05,
      repeat: 1,
      yoyo: true,
    });
  }

  return (
    <group
      ref={ref}
      onClick={e => {
        e.stopPropagation();
        if (user) {
          dispatch(rootLogout());
        }
        clickAnimation();
        dispatch(setTarget('login'));
      }}>
      <mesh
        receiveShadow
        castShadow
        position={[0, 2, -0.1]}
        scale={0.8}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={nodes.Cube.geometry}>
        <meshStandardMaterial
          color="rgba(255, 255, 255, 1)"
          roughness={0}
          metalness={0.8}
          emissive={new THREE.Color('#ff0000').convertSRGBToLinear()}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
      <Text3D
        material={material}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.2}
        height={0.02}
        letterSpacing={-0.06}
        size={0.8}
        font="/NanumGothic_Regular.json"
        position={[0.3, 3, -1]}
        rotation={[0, 0, Math.PI / 2]}>
        {user ? '로그아웃' : '로그인'}
      </Text3D>
    </group>
  );
};

export default LogButton;
