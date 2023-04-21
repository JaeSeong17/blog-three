import { useDispatch } from 'react-redux';
import { setTarget } from '../../../modules/camController';
import { Text3dTemplate } from '../template/Text3DTemplate';

const GuestButton = () => {
  const dispatch = useDispatch();
  return (
    <group
      position={[0.5, -0.05, -2.25]}
      rotation={[-Math.PI / 20, 0, -Math.PI / 20]}
      onClick={e => {
        e.stopPropagation();
        dispatch(setTarget('key'));
      }}>
      <mesh>
        <boxGeometry args={[1.1, 0.2, 0.45]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>
      <Text3dTemplate
        innerText={'게스트입장'}
        position={[-0.5, -0.04, -0.07]}
        rotation={[Math.PI / 2, 0, 0]}
        color={'white'}
        height={0.02}
        size={0.16}
        bevelSize={0.005}
        letterSpacing={-0.01}
      />
    </group>
  );
};

export default GuestButton;
