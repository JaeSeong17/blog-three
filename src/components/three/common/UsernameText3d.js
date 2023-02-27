import { useSelector } from 'react-redux';
import * as THREE from 'three';
import { Text3D } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const material = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#fafafa').convertSRGBToLinear(),
  roughness: 0,
  metalness: 0.8,
  emissive: new THREE.Color('#ff0000').convertSRGBToLinear(),
});

const UsernameText3d = () => {
  const user = useSelector(state => state.user.user);
  const target = useSelector(state => state.controller.target);
  const textRef1 = useRef();
  const textRef2 = useRef();
  useEffect(() => {
    gsap
      .timeline()
      .to(textRef1.current.position, {
        z: ['start', 'login', 'loading'].includes(target) ? -2 : 0,
        delay: 5,
        duration: 1.2,
      })
      .to(textRef2.current.position, {
        z: ['start', 'login', 'loading'].includes(target) ? -2 : 0,
        duration: 1.2,
      });
  }, [target]);

  return (
    <group>
      <Text3D
        ref={textRef1}
        material={material}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.2}
        height={0.02}
        letterSpacing={-0.06}
        size={1.1}
        font="/NanumGothic_Regular.json"
        position={[-4.5, 1, -2]}
        rotation={[0, 0, Math.PI / 2]}>
        안녕하세요
      </Text3D>
      <Text3D
        ref={textRef2}
        material={material}
        bevelEnabled
        bevelSize={0.04}
        bevelThickness={0.2}
        height={0.02}
        letterSpacing={-0.06}
        size={1.1}
        font="/NanumGothic_Regular.json"
        position={[-2.2, 1, -2]}
        rotation={[0, 0, Math.PI / 2]}
        anchorX="right">
        {user ? user.username : 'Guest'}님
      </Text3D>
    </group>
  );
};

export default UsernameText3d;
