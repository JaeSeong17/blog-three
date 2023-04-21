import { useDispatch } from 'react-redux';
import { setTarget } from 'src/modules/camController';

const ExitButton = () => {
  const dispatch = useDispatch();
  return (
    <mesh
      position={[0.5, -5.5, 5.1]}
      onClick={() => {
        dispatch(setTarget('key'));
      }}>
      <boxGeometry args={[0.2, 2.4, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default ExitButton;
