import { Text3D } from '@react-three/drei';
import { useDispatch, useSelector } from 'react-redux';
import { forwardRef } from 'react';
import { setTarget } from '../../../modules/root/controller';

const RegisterButton = forwardRef((props, ref) => {
  const target = useSelector(state => state.controller.target);
  const dispatch = useDispatch();
  return (
    <group
      ref={ref}
      position={[1.72, 0, -1.8]}
      rotation={[-Math.PI / 20, 0, -Math.PI / 20]}
      onClick={e => {
        e.stopPropagation();
        if (target === 'login') {
          dispatch(setTarget('register'));
        } else {
          dispatch(setTarget('login'));
        }
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
        position={[-0.4, -0.1, -0.07]}
        rotation={[Math.PI / 2, 0, 0]}
        anchorX="center">
        {target === 'login' ? '계정생성' : '로그인'}
      </Text3D>
    </group>
  );
});

export default RegisterButton;
