import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

const DataTower = () => {
  const ref = useRef([]);
  const pos = [];
  gsap.registerPlugin(CustomEase);
  useEffect(() => {
    for (let i = 0; i < ref.current.length; i++) {
      pos.push(ref.current[i].position);
    }
    gsap
      .timeline()
      .to(pos, {
        z: 2,
        duration: 1,
      })
      .to(pos, {
        delay: 3,
        stagger: 0.05,
        repeat: -1,
        ease: CustomEase.create(
          'custom',
          'M0,0,C0,0,0.295,-0.019,0.322,0.272,0.348,0.56,0.402,1,0.5,1,0.63,1,0.709,0.759,0.816,0.526,0.936,0.261,1,0,1,0',
        ),
        repeatDelay: 3,
        z: 2.1,
      });
  }, []);

  return (
    <group>
      {Array.from({ length: 20 }, (v, i) => i).map(index => (
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
