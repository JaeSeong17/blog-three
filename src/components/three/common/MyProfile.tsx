import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { Text3dTemplate } from './Text3DTemplate';
import { RootState } from 'root-state-types';
import { Mesh } from 'three';
import { profileOnAnim, profileOffAnim } from '../anim/SubObjectAnim';

const MyProfile = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const target = useSelector((state: RootState) => state.camController.target);
  const textRef1 = useRef<Mesh>(null);
  const textRef2 = useRef<Mesh>(null);
  useEffect(() => {
    if (textRef1.current && textRef2.current) {
      const onTarget = ['key', 'board', 'connect', 'screen'];
      if (onTarget.includes(target)) {
        profileOnAnim(textRef1.current, textRef2.current).play();
      } else {
        profileOffAnim(textRef1.current, textRef2.current).play();
      }
    }
  }, [target]);

  return (
    <group>
      <Text3dTemplate
        ref={textRef1}
        innerText={'안녕하세요'}
        position={[-4.5, 1, -2]}
        rotation={[0, 0, Math.PI / 2]}
        size={1.1}
        height={0.02}
        bevelSize={0.04}
        letterSpacing={-0.06}
      />
      <Text3dTemplate
        ref={textRef2}
        innerText={`${user ? user : 'Guest'}님`}
        position={[-2.2, 1, -2]}
        rotation={[0, 0, Math.PI / 2]}
        size={1.1}
        height={0.02}
        bevelSize={0.04}
        letterSpacing={-0.06}
      />
    </group>
  );
};

export default MyProfile;
