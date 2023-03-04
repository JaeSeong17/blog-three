import { Html } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { setTarget } from '../../../modules/root/controller';
import { setRootUser, completeSyncLogout } from '../../../modules/root/user';
import AuthHtml from '../../html/root/AuthHtml';
import GuestButton from './GuestButton';
import RegisterButton from './RegisterButton';

const AuthBox = () => {
  const target = useSelector(state => state.controller.target);
  const rootUser = useSelector(state => state.user);
  const boxRef = useRef(null);
  const formRef = useRef(null);
  const gstBtnRef = useRef(null);
  const regBtnRef = useRef(null);
  const dispatch = useDispatch();

  const updateRootUser = user => {
    dispatch(setRootUser(user));
  };
  const initRootUser = () => {
    dispatch(completeSyncLogout());
  };
  const setTargetToKey = () => {
    if (!['login', 'register'].includes(target)) return;
    dispatch(setTarget('loading'));
    setTimeout(() => dispatch(setTarget('key')), 2000);
  };

  useEffect(() => {
    if (['login', 'register'].includes(target)) {
      gsap
        .timeline()
        .to(boxRef.current.position, {
          z: 3,
          delay: 1,
          duration: 1,
        })
        .to(formRef.current, {
          autoAlpha: 1,
          duration: 1,
        })
        .to(
          gstBtnRef.current.position,
          {
            y: -0.4,
          },
          'btnLabel',
        )
        .to(
          regBtnRef.current.position,
          {
            y: -0.6,
          },
          'btnLabel',
        );
    } else {
      gsap
        .timeline()
        .to(
          formRef.current,
          {
            autoAlpha: 0,
            duration: 1,
          },
          'closeLabel',
        )
        .to(
          gstBtnRef.current.position,
          {
            y: 0,
          },
          'closeLabel',
        )
        .to(
          regBtnRef.current.position,
          {
            y: 0,
          },
          'closeLabel',
        )
        .to(boxRef.current.position, {
          z: -3,
          duration: 1,
        });
    }
  }, [target]);

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
      <GuestButton ref={gstBtnRef} />
      <RegisterButton ref={regBtnRef} />
    </group>
  );
};

export default AuthBox;
