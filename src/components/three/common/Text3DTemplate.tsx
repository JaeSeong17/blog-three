import { Text3D } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

const material = new MeshStandardMaterial({
  color: '#fafafa',
  roughness: 0,
  metalness: 0.8,
  emissive: '#ff0000',
});

interface Text3dTemplateParams {
  innerText: string;
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  height: number;
  size: number;
  bevelSize: number;
  letterSpacing: number;
}

export const Text3dTemplate = ({
  innerText,
  position,
  rotation,
  size,
  height,
  bevelSize,
  letterSpacing,
}: Text3dTemplateParams) => {
  return (
    <Text3D
      position={position}
      material={material}
      rotation={rotation}
      bevelEnabled
      bevelSize={bevelSize}
      bevelThickness={0.1}
      height={height}
      letterSpacing={letterSpacing}
      size={size}
      font="/NanumGothic_Regular.json">
      {innerText}
    </Text3D>
  );
};
