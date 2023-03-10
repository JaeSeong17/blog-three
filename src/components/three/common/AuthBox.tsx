import { Html } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTarget } from '../../../modules/root/camController';
import { setRootUser, completeSyncLogout } from '../../../modules/root/user';
import AuthHtml from '../../html/root/AuthHtml';
import GuestButton from './GuestButton';
import RegisterButton from './RegisterButton';
import { RootState } from 'root-state-types';
import { GroupProps } from '@react-three/fiber';
import { authBoxOnAnim, authBoxOffAnim } from '../anim/AuthBoxAnim';

const AuthBox = () => {
  const dispatch = useDispatch();
  const boxRef = useRef<GroupProps>(null);
  const btnRef = useRef<GroupProps>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const activateTarget = ['login', 'register']; // AuthBox가 활성화 되는 타겟
  const { target, rootUser } = useSelector(
    ({ camController, user }: RootState) => ({
      target: camController.target,
      rootUser: user,
    }),
  );

  const updateRootUser = (user: string) => {
    dispatch(setRootUser(user));
  };
  const initRootUser = () => {
    dispatch(completeSyncLogout());
  };
  const setTargetToKey = () => {
    if (!activateTarget.includes(target)) return;
    dispatch(setTarget('loading'));
    setTimeout(() => dispatch(setTarget('key')), 2000);
  };

  useEffect(() => {
    if (boxRef.current && formRef.current && btnRef.current) {
      if (activateTarget.includes(target)) {
        authBoxOnAnim(boxRef.current, formRef.current, btnRef.current);
      } else {
        authBoxOffAnim(boxRef.current, formRef.current, btnRef.current);
      }
    }
  }, [target, boxRef, formRef, btnRef]);

  return (
    <group position={[3, -3, -3]} ref={boxRef}>
      <mesh rotation={[-Math.PI / 20, 0, -Math.PI / 20]}>
        <boxGeometry args={[5, 0.2, 4.5]} />
        <meshStandardMaterial />
        <Html
          ref={formRef}
          transform
          occlude={true}
          distanceFactor={5}
          rotation-x={Math.PI / 2}
          position={[0, -0.11, 0.26]}>
          <AuthHtml
            target={target}
            rootUser={rootUser}
            initRootUser={initRootUser}
            updateRootUser={updateRootUser}
            setTargetToKey={setTargetToKey}
          />
        </Html>
      </mesh>
      <group ref={btnRef}>
        <GuestButton />
        <RegisterButton />
      </group>
    </group>
  );
};

export default AuthBox;
