import { Text3dTemplate } from '../template/Text3DTemplate';

interface NoneMarkPamrams {
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
}

const NoneMark = ({ position, rotation }: NoneMarkPamrams) => {
  return (
    <Text3dTemplate
      innerText="None"
      position={position}
      rotation={rotation}
      size={0.75}
      height={0.02}
      bevelSize={0.04}
      letterSpacing={-0.06}
    />
  );
};

export default NoneMark;
