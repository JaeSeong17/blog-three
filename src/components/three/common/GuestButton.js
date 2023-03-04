import { Text3D } from '@react-three/drei';
import { useDispatch } from 'react-redux';
import { forwardRef } from 'react';
import { setTarget } from '../../../modules/root/controller';

const GuestButton = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  return (
    <group
      ref={ref}
      position={[0.5, -0.4, -1.83]}
      rotation={[-Math.PI / 20, 0, -Math.PI / 20]}
      onClick={e => {
        e.stopPropagation();
        dispatch(setTarget('key'));
      }}>
      <mesh>
        <boxGeometry args={[1.1, 0.2, 0.45]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>
      <Text3D
        bevelEnabled
        bevelSize={0.008}
        bevelThickness={0.01}
        height={0.02}
        letterSpacing={-0.01}
        size={0.16}
        font="/NanumGothic_Regular.json"
        position={[-0.5, -0.1, -0.07]}
        rotation={[Math.PI / 2, 0, 0]}
        anchorX="center">
        게스트입장
      </Text3D>
    </group>
  );
});

export default GuestButton;
