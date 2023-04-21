import { forwardRef, ForwardedRef } from 'react';
import { Mesh } from 'three';
import { ThreeEvent } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
interface KeyCapParams {
  position: [x: number, y: number, z: number];
  scale: number;
  color: string;
  emissive: string;
  longType?: boolean;
  clickHandler?: (e: ThreeEvent<MouseEvent>) => void;
}

const KeycapTemplate = forwardRef(
  (
    { position, scale, color, emissive, longType, clickHandler }: KeyCapParams,
    ref: ForwardedRef<Mesh>,
  ) => {
    const meshType = longType ? '/model/keycap_long.glb' : '/model/keycap.glb';
    const gltf = useLoader(GLTFLoader, meshType); // 키캡 메쉬 로드
    const cube = gltf.scene.children.find(
      child => child.name === 'Cube',
    ) as Mesh;

    return (
      <mesh
        receiveShadow
        castShadow
        ref={ref}
        position={position}
        scale={scale}
        onClick={clickHandler}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={cube.geometry}>
        <meshStandardMaterial
          color={color}
          roughness={0}
          metalness={0.8}
          emissive={emissive}
        />
      </mesh>
    );
  },
);

export default KeycapTemplate;
