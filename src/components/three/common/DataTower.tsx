import { useEffect, useRef, useState } from 'react';
import { Mesh } from 'three';
import { dataTowerIdleAnim } from '../anim/SubObjectAnim';
import { useSelector } from 'react-redux';
import { RootState } from 'root-state-types';

const DataTower = () => {
  const target = useSelector((state: RootState) => state.camController.target);
  const ref = useRef<Array<Mesh | null>>([]);
  const [idle, setIdle] = useState<gsap.core.Timeline>();
  const onTarget = ['start', 'login', 'register'];

  // 애니메이션 함수 변수에 할당
  useEffect(() => {
    if (ref.current && ref.current.every(item => item !== null)) {
      setIdle(dataTowerIdleAnim(ref.current as Array<Mesh>));
    }
  }, [ref]);

  // play, pause
  useEffect(() => {
    if (idle) {
      if (onTarget.includes(target)) {
        idle.play();
      } else {
        idle.pause();
      }
    }
  }, [idle, target]);

  return (
    <group>
      {Array.from({ length: 20 }, (_, i) => i).map(index => (
        <mesh
          key={index}
          ref={el => (ref.current[index] = el)}
          position={[-4, -index * 0.2, -4]}>
          <boxGeometry args={[4, 0.2, 4]} />
          <meshStandardMaterial />
        </mesh>
      ))}
    </group>
  );
};

export default DataTower;
