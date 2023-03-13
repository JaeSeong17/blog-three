import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { setTarget } from '../../../modules/root/camController';
import { Mesh } from 'three';
import { ConnectBoxesOff, ConnectBoxesOn } from '../anim/SubObjectAnum';
import { RootState } from 'root-state-types';

const ConnectBoxes = () => {
  const boxesRef = useRef<Array<Mesh | null>>([]);
  const target = useSelector(
    ({ camController }: RootState) => camController.target,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (boxesRef.current && boxesRef.current.every(box => box !== null)) {
      const tl = gsap.timeline();
      if (target === 'connect' || target === 'screen') {
        tl.add(ConnectBoxesOn(boxesRef.current as Mesh[]));
        if (target === 'connect') {
          tl.add(() => {
            dispatch(setTarget('screen'));
          });
        }
      } else {
        tl.add(ConnectBoxesOff(boxesRef.current as Mesh[]));
      }
    }
  }, [target, boxesRef.current]);

  return (
    <group position={[0, 13, 0]}>
      {Array.from({ length: 28 }, (v, i) => i).map(index => (
        <mesh
          key={index}
          ref={el => (boxesRef.current[index] = el)}
          position={[0, index, -3]}>
          <boxGeometry args={[0.5, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      ))}
    </group>
  );
};

export default ConnectBoxes;
