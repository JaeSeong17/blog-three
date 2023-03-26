import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Mesh } from 'three';
import { Text3dTemplate } from '../template/Text3DTemplate';

interface NoneMarkPamrams {
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
}

const NoneMark = forwardRef(({ position, rotation }: NoneMarkPamrams, ref) => {
  const innerRef = useRef<Mesh>(null);
  useImperativeHandle(ref, () => innerRef.current);
  return (
    <Text3dTemplate
      ref={innerRef}
      innerText="None"
      position={position}
      rotation={rotation}
      size={0.75}
      height={0.02}
      bevelSize={0.04}
      letterSpacing={-0.06}
    />
  );
});

export default NoneMark;
