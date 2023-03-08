import Keycap from '../common/Keycap';
import { useRef, useEffect } from 'react';
import { Text } from '@react-three/drei';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import { useSelector } from 'react-redux';

const data = [
  {
    index: 1,
    title: 'Total',
  },
  {
    index: 2,
    title: 'React',
  },
  {
    index: 3,
    title: 'JavaScript',
  },
  {
    index: 4,
    title: 'CS',
  },
  {
    index: 5,
    title: 'Dev Log',
  },
];

const KeyContainer = () => {
  const target = useSelector(state => state.controller.target);
  const user = useSelector(state => state.user.user);
  const boxesRef = useRef([]);
  const boxesPos = [];
  const textsRef = useRef([]);
  const textsPos = [];
  const writeBtnRef = useRef();
  const writeTextRef = useRef();
  gsap.registerPlugin(CustomEase);

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      boxesPos.push(boxesRef.current[i].position);
      textsPos.push(textsRef[i].position);
    }
    const onTarget = ['key', 'board', 'connect', 'screen'];
    const customEaseValue =
      'M0,0 C0.126,0.382 0.232,1.89 0.49,1.194 0.666,0.718 0.818,1.001 1,1 ';

    if (onTarget.includes(target)) {
      gsap
        .timeline()
        .to(
          boxesPos,
          {
            z: 1.1,
            ease: CustomEase.create('custom', customEaseValue),
            duration: 1,
            stagger: 0.2,
          },
          'listLabel',
        )
        .to(
          textsPos,
          {
            z: 0.4,
            ease: CustomEase.create('custom', customEaseValue),
            duration: 1,
            stagger: 0.2,
          },
          'listLabel',
        )
        .to(
          writeBtnRef.current.position,
          {
            z: 1.1,
            duration: 1,
          },
          'writeLabel',
        )
        .to(
          writeTextRef.current.position,
          {
            z: 0.4,
            duration: 1,
          },
          'writeLabel',
        );
    } else {
      gsap
        .timeline()
        .to(
          boxesPos,
          {
            z: -3,
            ease: CustomEase.create('custom', customEaseValue),
            duration: 1,
          },
          'closeLabel',
        )
        .to(
          textsPos,
          {
            z: -3,
            ease: CustomEase.create('custom', customEaseValue),
            duration: 1,
          },
          'closeLabel',
        )
        .to(
          writeBtnRef.current.position,
          {
            z: -3,
            duration: 1,
          },
          'closeLabel',
        )
        .to(
          writeTextRef.current.position,
          {
            z: -3,
            duration: 1,
          },
          'closeLabel',
        );
    }
  }, [target]);

  return (
    <group position={[0, -4, 0]}>
      {data.map((d, idx) => (
        <group key={idx}>
          <Keycap
            ref={el => (boxesRef.current[idx] = el)}
            index={idx}
            position={[8 - idx * 4, 0, -3]}
            tag={d.title}
          />
          <Text
            ref={el => (textsRef[idx] = el)}
            color="black"
            position={[8 - idx * 4, 1.5, -3]}
            fontSize={0.6}
            rotation={[0, Math.PI / 4, Math.PI / 2]}
            anchorX="left">
            {d.title}
          </Text>
        </group>
      ))}
      <group>
        <Keycap writeBtn ref={writeBtnRef} position={[12, 0, -3]} />
        <Text
          ref={writeTextRef}
          color="black"
          position={[12, 1.5, -2]}
          fontSize={0.6}
          rotation={[0, Math.PI / 4, Math.PI / 2]}
          anchorX="left">
          {user ? 'Write new Post' : 'Write (login required)'}
        </Text>
      </group>
    </group>
  );
};

export default KeyContainer;