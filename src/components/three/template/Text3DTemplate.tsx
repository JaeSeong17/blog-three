import { Text3D } from '@react-three/drei';
import { ForwardedRef, forwardRef } from 'react';
import { Mesh } from 'three';

interface Text3dTemplateParams {
  color?: string;
  innerText: string;
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  height: number;
  size: number;
  bevelSize: number;
  letterSpacing: number;
}

export const Text3dTemplate = forwardRef(
  (props: Text3dTemplateParams, ref: ForwardedRef<Mesh>) => {
    return (
      <Text3D
        ref={ref}
        position={props.position}
        // material={material}
        rotation={props.rotation}
        bevelEnabled
        bevelSize={props.bevelSize}
        bevelThickness={0.1}
        height={props.height}
        letterSpacing={props.letterSpacing}
        size={props.size}
        font="/font/NanumGothic_Regular.json">
        <meshStandardMaterial
          color={'#fafafa'}
          roughness={0}
          metalness={0.8}
          emissive={props.color ? props.color : '#ff0000'}
        />
        {props.innerText}
      </Text3D>
    );
  },
);
