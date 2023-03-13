import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mesh } from 'three';
import { dataTowerAnim } from '../anim/SubObjectAnim';

const DataTower = () => {
  const ref = useRef<Array<Mesh | null>>([]);

  useEffect(() => {
    if (ref.current && ref.current.every(item => item !== null)) {
      dataTowerAnim(ref.current as Array<Mesh>);
    }
  }, [ref]);

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
